import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTimerStore } from '../../store/timerStore';

export default function CoccionScreen() {
  const { coccionData } = useTimerStore();
  const insets = useSafeAreaInsets();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (coccionData) {
      clearInterval(intervalRef.current!);
      setRunning(false); setFinished(false);
      setSeconds(coccionData.tiempo * 60);
    }
  }, [coccionData]);

  const start = async () => {
    if (seconds === 0) return;
    setRunning(true);

    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: { title: '¡Cocción completada!', body: 'Es hora de revisar el horno.', sound: true },
      trigger: { seconds } as any,
    });

    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(intervalRef.current!); setRunning(false); setFinished(true); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = async () => { 
    clearInterval(intervalRef.current!); 
    setRunning(false); 
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const reset = async () => {
    clearInterval(intervalRef.current!);
    setRunning(false); setFinished(false);
    await Notifications.cancelAllScheduledNotificationsAsync();
    setSeconds(coccionData ? coccionData.tiempo * 60 : 0);
  };

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const totalSeconds = coccionData ? coccionData.tiempo * 60 : 0;
  const progress = totalSeconds > 0 ? (totalSeconds - seconds) / totalSeconds : 0;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.timerBox, finished && styles.timerBoxFinished]}>
          {coccionData ? (
            <>
              <Text style={styles.timerLabel}>🔥 {coccionData.nombre}</Text>
              <Text style={styles.timerSub}>{coccionData.ovenType} · {coccionData.temp}°C · {coccionData.vapor ? 'Con vapor' : 'Sin vapor'}</Text>
            </>
          ) : <Text style={styles.timerLabel}>🔥 Cocción</Text>}
          <Text style={[styles.timerDisplay, finished && styles.timerDisplayFinished]}>{fmt(seconds)}</Text>
          {finished && <Text style={styles.finishedText}>✅ ¡Cocción completada!</Text>}
          {totalSeconds > 0 && (
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          )}
        </View>

        <View style={styles.controls}>
          {!running ? (
            <TouchableOpacity style={[styles.btnPlay, seconds === 0 && styles.btnDisabled]} onPress={start} disabled={seconds === 0}>
              <Text style={styles.btnPlayText}>▶ Iniciar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnPause} onPress={pause}>
              <Text style={styles.btnPauseText}>⏸ Pausar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.btnReset} onPress={reset}>
            <Text style={styles.btnResetText}>↺</Text>
          </TouchableOpacity>
        </View>

        {coccionData ? (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Parámetros de cocción</Text>
            <View style={styles.cocGrid}>
              <View style={styles.cocTile}><Text style={styles.cocIcon}>🌡️</Text><Text style={styles.cocVal}>{coccionData.temp}°C</Text><Text style={styles.cocLabel}>Horno</Text></View>
              <View style={styles.cocTile}><Text style={styles.cocIcon}>⏱</Text><Text style={styles.cocVal}>{coccionData.tiempo} min</Text><Text style={styles.cocLabel}>Tiempo</Text></View>
              <View style={styles.cocTile}><Text style={styles.cocIcon}>🥖</Text><Text style={styles.cocVal}>{coccionData.tempInterna}°C</Text><Text style={styles.cocLabel}>T° interna</Text></View>
              <View style={styles.cocTile}><Text style={styles.cocIcon}>💧</Text><Text style={styles.cocVal}>{coccionData.vapor ? 'Sí' : 'No'}</Text><Text style={styles.cocLabel}>Vapor</Text></View>
            </View>
            {coccionData.notas ? (
              <View style={styles.notasBox}>
                <Text style={styles.notasText}>{coccionData.notas}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔥</Text>
            <Text style={styles.emptyText}>Abrí una receta y tocá</Text>
            <Text style={styles.emptyText}>🔥 Cargar en Cocción + Timer</Text>
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
  timerSub: { color: '#8A7F72', fontSize: 12, marginBottom: 16, textAlign: 'center' },
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
  btnReset: { backgroundColor: '#1A1A1A', borderRadius: 50, paddingVertical: 16, paddingHorizontal: 20, borderWidth: 1, borderColor: '#2E2A25' },
  btnResetText: { color: '#8A7F72', fontSize: 20 },
  infoBox: { backgroundColor: '#141414', borderRadius: 16, borderWidth: 1, borderColor: '#1E1C18', padding: 16 },
  infoTitle: { color: '#8A7F72', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  cocGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  cocTile: { flex: 1, minWidth: '45%', backgroundColor: '#1A1A1A', borderRadius: 12, padding: 14, alignItems: 'center' },
  cocIcon: { fontSize: 20, marginBottom: 4 },
  cocVal: { color: '#F2B84B', fontSize: 18, fontWeight: '700' },
  cocLabel: { color: '#8A7F72', fontSize: 10, textTransform: 'uppercase', marginTop: 2 },
  notasBox: { borderLeftWidth: 3, borderLeftColor: '#F2B84B', paddingLeft: 12, paddingVertical: 8, backgroundColor: 'rgba(242,184,75,0.05)', borderRadius: 4 },
  notasText: { color: '#8A7F72', fontSize: 12, lineHeight: 18 },
  emptyBox: { alignItems: 'center', paddingTop: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#8A7F72', fontSize: 14, marginBottom: 4 },
});
