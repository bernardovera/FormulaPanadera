import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, AppState } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTimerStore } from '../../store/timerStore';

const LEV_ICONS: Record<string, string> = {
  'Fermentación en bloque': '🫙', 'Pre-forma': '🤲', 'Forma final': '🥖',
  'Retardo (nevera)': '❄️', 'Autólisis': '⏳', 'Poolish': '🧫',
  'Biga': '🧫', 'Pie francés': '🥐',
};

export default function LevadoScreen() {
  const { levadoEtapa } = useTimerStore();
  const insets = useSafeAreaInsets();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const appState = useRef(AppState.currentState);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  useEffect(() => {
    if (levadoEtapa) {
      setRunning(false);
      setFinished(false);
      setTargetTime(null);
      const total = levadoEtapa.horas * 3600 + levadoEtapa.mins * 60;
      setSeconds(total > 0 ? total : 3600);
    }
  }, [levadoEtapa]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running && targetTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const left = Math.max(0, Math.round((targetTime - now) / 1000));
        setSeconds(left);
        if (left <= 0) {
          setRunning(false);
          setFinished(true);
          setTargetTime(null);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, targetTime]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        Notifications.dismissNotificationAsync('levado_bg').catch(() => {});
      } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        if (running && targetTime) {
          const left = Math.max(0, Math.round((targetTime - Date.now()) / 1000));
          if (left > 0) {
            const d = new Date(targetTime);
            const hh = d.getHours().toString().padStart(2, '0');
            const mm = d.getMinutes().toString().padStart(2, '0');
            Notifications.scheduleNotificationAsync({
              identifier: 'levado_bg',
              content: {
                title: '⏱ Levado en progreso',
                body: `⏰ Termina a las ${hh}:${mm}`,
                autoDismiss: false,
                sticky: true,
              },
              trigger: null,
            }).catch(() => {});
          }
        }
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, [running, targetTime]);

  const start = () => {
    if (seconds === 0) return;
    setRunning(true);
    setTargetTime(Date.now() + seconds * 1000);

    Notifications.cancelScheduledNotificationAsync('levado_end').then(() => {
      Notifications.scheduleNotificationAsync({
        identifier: 'levado_end',
        content: { title: '¡Levado completado!', body: levadoEtapa ? `La etapa de ${levadoEtapa.nombre} ha finalizado.` : 'El tiempo de levado terminó.', sound: true },
        trigger: { seconds } as any,
      }).catch(e => console.warn('Notif Error:', e));
    }).catch(e => console.warn('Cancel Error:', e));
  };

  const pause = () => { 
    setRunning(false); 
    setTargetTime(null);
    Notifications.cancelScheduledNotificationAsync('levado_end').catch(console.warn);
    Notifications.dismissNotificationAsync('levado_bg').catch(console.warn);
  };

  const adjustTime = (amount: number) => {
    if (running && targetTime) {
       const newTarget = targetTime + amount * 1000;
       setTargetTime(newTarget);
       const newSecs = Math.max(0, Math.round((newTarget - Date.now()) / 1000));
       setSeconds(newSecs);
       Notifications.cancelScheduledNotificationAsync('levado_end').then(() => {
         if (newSecs > 0) {
           Notifications.scheduleNotificationAsync({
             identifier: 'levado_end',
             content: { title: '¡Levado completado!', body: levadoEtapa ? `La etapa de ${levadoEtapa.nombre} ha finalizado.` : 'El tiempo de levado terminó.', sound: true },
             trigger: { seconds: newSecs } as any,
           }).catch(() => {});
         }
       }).catch(() => {});
    } else {
       setSeconds(Math.max(0, seconds + amount));
    }
  };

  const reset = async () => {
    setRunning(false); 
    setFinished(false);
    setTargetTime(null);
    await Notifications.cancelScheduledNotificationAsync('levado_end').catch(() => {});
    await Notifications.dismissNotificationAsync('levado_bg').catch(() => {});
    if (levadoEtapa) {
      const total = levadoEtapa.horas * 3600 + levadoEtapa.mins * 60;
      setSeconds(total > 0 ? total : 3600);
    } else setSeconds(0);
  };

  const totalSeconds = levadoEtapa ? levadoEtapa.horas * 3600 + levadoEtapa.mins * 60 : 0;
  const progress = totalSeconds > 0 ? (totalSeconds - seconds) / totalSeconds : 0;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.timerBox, finished && styles.timerBoxFinished]}>
          {levadoEtapa ? (
            <>
              <Text style={styles.timerLabel}>{LEV_ICONS[levadoEtapa.tipo] || '⏱'} {levadoEtapa.nombre}</Text>
              <Text style={styles.timerSub}>{levadoEtapa.tipo} · {levadoEtapa.temp}°C</Text>
            </>
          ) : <Text style={styles.timerLabel}>⏱ Levado</Text>}
          <Text style={[styles.timerDisplay, finished && styles.timerDisplayFinished]}>{fmt(seconds)}</Text>
          {finished && <Text style={styles.finishedText}>✅ ¡Levado completado!</Text>}
          {totalSeconds > 0 && (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          )}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.btnAdjust} onPress={() => adjustTime(-300)}>
            <Text style={styles.btnAdjustText}>-5m</Text>
          </TouchableOpacity>

          {!running ? (
            <TouchableOpacity style={[styles.btnPlay, seconds === 0 && styles.btnDisabled]} onPress={start} disabled={seconds === 0}>
              <Text style={styles.btnPlayText}>▶ Iniciar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnPause} onPress={pause}>
              <Text style={styles.btnPauseText}>⏸ Pausar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.btnAdjust} onPress={() => adjustTime(300)}>
            <Text style={styles.btnAdjustText}>+5m</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <TouchableOpacity style={styles.btnReset} onPress={reset}>
            <Text style={styles.btnResetText}>↺ Reiniciar cronómetro</Text>
          </TouchableOpacity>
        </View>

        {levadoEtapa ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Etapa cargada desde receta</Text>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Tipo</Text><Text style={styles.infoVal}>{levadoEtapa.tipo}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Temperatura</Text><Text style={styles.infoVal}>{levadoEtapa.temp}°C</Text></View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duración</Text>
              <Text style={styles.infoVal}>{levadoEtapa.horas > 0 ? `${levadoEtapa.horas}h ` : ''}{levadoEtapa.mins > 0 ? `${levadoEtapa.mins}m` : ''}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🫙</Text>
            <Text style={styles.emptyText}>Abrí una receta y tocá</Text>
            <Text style={styles.emptyText}>▶ Timer en una etapa de levado</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 16 },
  timerBox: { backgroundColor: '#141414', borderRadius: 20, borderWidth: 1, borderColor: '#1E1C18', padding: 24, alignItems: 'center', marginBottom: 16 },
  timerBoxFinished: { borderColor: '#6EC89A', backgroundColor: 'rgba(110,200,154,0.05)' },
  timerLabel: { color: '#F0EDE8', fontSize: 16, fontWeight: '600', marginBottom: 4, textAlign: 'center' },
  timerSub: { color: '#8A7F72', fontSize: 12, marginBottom: 16 },
  timerDisplay: { color: '#F2B84B', fontSize: 64, fontWeight: '700' },
  timerDisplayFinished: { color: '#6EC89A' },
  finishedText: { color: '#6EC89A', fontSize: 16, fontWeight: '600', marginTop: 8 },
  progressBar: { width: '100%', height: 6, backgroundColor: '#1A1A1A', borderRadius: 3, marginTop: 16 },
  progressFill: { height: 6, backgroundColor: '#F2B84B', borderRadius: 3 },
  controls: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  btnPlay: { flex: 1, backgroundColor: '#F2B84B', borderRadius: 50, paddingVertical: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.4 },
  btnPlayText: { color: '#000', fontSize: 16, fontWeight: '700' },
  btnPause: { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#F2B84B' },
  btnPauseText: { color: '#F2B84B', fontSize: 16, fontWeight: '700' },
  btnAdjust: { backgroundColor: '#262420', borderRadius: 50, paddingVertical: 16, paddingHorizontal: 20, borderWidth: 1, borderColor: '#F2B84B', justifyContent: 'center', alignItems: 'center' },
  btnAdjustText: { color: '#F2B84B', fontSize: 16, fontWeight: '700' },
  btnReset: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 12, paddingHorizontal: 20, borderWidth: 1, borderColor: '#2E2A25' },
  btnResetText: { color: '#8A7F72', fontSize: 14, fontWeight: '500' },
  infoBox: { backgroundColor: '#141414', borderRadius: 16, borderWidth: 1, borderColor: '#1E1C18', padding: 16 },
  infoTitle: { color: '#8A7F72', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#1E1C18' },
  infoLabel: { color: '#8A7F72', fontSize: 13 },
  infoVal: { color: '#F0EDE8', fontSize: 13, fontWeight: '600' },
  emptyBox: { alignItems: 'center', paddingTop: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#8A7F72', fontSize: 14, marginBottom: 4 },
});
