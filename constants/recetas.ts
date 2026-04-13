export type Ingrediente = {
  name: string;
  pct: number;
  cat: string;
};

export type EtapaLevado = {
  nombre: string;
  horas: number;
  mins: number;
  temp: number;
  tipo: string;
};

export type Coccion = {
  temp: number;
  tiempo: number;
  tempInterna: number;
  ovenType: string;
  vapor: boolean;
  notas: string;
};

export type Receta = {
  id: string;
  name: string;
  category: string;
  poston: number;
  preset: boolean;
  ingredients: Ingrediente[];
  proceso: { amasado: string; tempMasa: number };
  levado: EtapaLevado[];
  coccion: Coccion;
};

export const RECETAS: Receta[] = [
  { id: 'p1', name: 'Pan dulce de anís (Tunjita)', category: 'Pan dulce venezolano', poston: 100, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 8, cat: 'azucar' }, { name: 'Mantequilla', pct: 6, cat: 'grasa' }, { name: 'Anís molido', pct: 1, cat: 'otro' }, { name: 'Huevos', pct: 10, cat: 'huevo' }],
    proceso: { amasado: '0/2-5/4-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 180, tiempo: 15, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Bola 100g' } },

  { id: 'p2', name: 'Rol de Canela', category: 'Pan dulce', poston: 2250, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 45, cat: 'liquido' }, { name: 'Levadura', pct: 3, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 10, cat: 'azucar' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Huevos', pct: 10, cat: 'huevo' }, { name: 'Leche en polvo', pct: 4, cat: 'lacteo' }, { name: 'Azúcar (relleno)', pct: 15, cat: 'relleno' }, { name: 'Canela en polvo (relleno)', pct: 2, cat: 'relleno' }, { name: 'Mantequilla (relleno)', pct: 10, cat: 'relleno' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 20, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Enrollado; barnizar con huevo' } },

  { id: 'p3', name: 'Quesadillas', category: 'Pan dulce venezolano', poston: 150, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 40, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 12, cat: 'azucar' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Queso blanco rallado (relleno)', pct: 30, cat: 'relleno' }, { name: 'Huevo (relleno)', pct: 10, cat: 'relleno' }, { name: 'Azúcar (relleno)', pct: 8, cat: 'relleno' }, { name: 'Miel (relleno)', pct: 5, cat: 'relleno' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 15, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Formado estrella plana; relleno 52% peso pastón' } },

  { id: 'p4', name: 'Cachito', category: 'Pan dulce venezolano', poston: 65, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 45, cat: 'liquido' }, { name: 'Levadura', pct: 3, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 8, cat: 'azucar' }, { name: 'Mantequilla', pct: 6, cat: 'grasa' }, { name: 'Jamón (relleno)', pct: 20, cat: 'relleno' }, { name: 'Tocineta (relleno)', pct: 10, cat: 'relleno' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 20, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Formado espiral; pintar con huevo' } },

  { id: 'p5', name: 'Golfeados', category: 'Pan dulce venezolano', poston: 4500, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 50, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 10, cat: 'azucar' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Queso llanero (relleno)', pct: 15, cat: 'relleno' }, { name: 'Papelón rallado (relleno)', pct: 8, cat: 'relleno' }, { name: 'Anís (relleno)', pct: 1, cat: 'relleno' }, { name: 'Melao de papelón (baño)', pct: 0, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 30, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 25, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Enrollado; cortar 4cm; enchumbar con melao durante y post horneado' } },

  { id: 'p6', name: 'Pan andino', category: 'Pan andino venezolano', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (Biga)', pct: 100, cat: 'harina' }, { name: 'Agua (Biga)', pct: 45, cat: 'liquido' }, { name: 'Levadura (Biga)', pct: 1, cat: 'levadura' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 30, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Huevos', pct: 15, cat: 'huevo' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Manteca de cerdo', pct: 5, cat: 'grasa' }, { name: 'Melao de papelón', pct: 10, cat: 'azucar' }, { name: 'Azúcar', pct: 8, cat: 'azucar' }, { name: 'Canela en polvo', pct: 0.5, cat: 'otro' }, { name: 'Leche', pct: 20, cat: 'lacteo' }],
    proceso: { amasado: '0/2-4/2-1/2-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Biga', horas: 18, mins: 0, temp: 5, tipo: 'Biga' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 180, tiempo: 25, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Batard 500g' } },

  { id: 'p7', name: 'Pan andino camaleón', category: 'Pan andino venezolano', poston: 500, preset: true,
    ingredients: [{ name: 'Harina (Guarapo)', pct: 10, cat: 'harina' }, { name: 'Afrecho (Guarapo)', pct: 90, cat: 'otro' }, { name: 'Agua (Guarapo)', pct: 1180, cat: 'liquido' }, { name: 'Papelón (Guarapo)', pct: 250, cat: 'azucar' }, { name: 'MMNL (Guarapo)', pct: 56, cat: 'otro' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Guarapo', pct: 20, cat: 'liquido' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Bicarbonato', pct: 0.5, cat: 'otro' }, { name: 'Guayabita molida', pct: 0.3, cat: 'otro' }, { name: 'Anís', pct: 0.5, cat: 'otro' }, { name: 'Clavo', pct: 0.1, cat: 'otro' }],
    proceso: { amasado: '0/2-4/2-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Guarapo', horas: 16, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación final', horas: 18, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 180, tiempo: 25, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Batard 500g; sin levadura comercial' } },

  { id: 'p8', name: 'Pan Pita Kosher', category: 'Pan plano', poston: 130, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 95, cat: 'harina' }, { name: 'Afrecho', pct: 5, cat: 'otro' }, { name: 'Agua', pct: 60, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 0, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 300, tiempo: 8, tempInterna: 90, ovenType: 'Estático', vapor: true, notas: 'Plano redondo 2-3.5cm espesor' } },

  { id: 'p9', name: 'Pan tipo gallego', category: 'Pan europeo', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 87, cat: 'harina' }, { name: 'Afrecho', pct: 3, cat: 'otro' }, { name: 'Harina de centeno', pct: 10, cat: 'harina' }, { name: 'Agua', pct: 62, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 95, ovenType: 'Convección', vapor: true, notas: 'Bola 500g' } },

  { id: 'p10', name: 'Pan Provenzal hierbas', category: 'Pan europeo', poston: 550, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Pie Francés', pct: 30, cat: 'otro' }, { name: 'Hierbas Provenza', pct: 0.35, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 225, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Batard 550g' } },

  { id: 'p11', name: 'Pan de ajo', category: 'Pan europeo', poston: 450, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Pie Francés', pct: 30, cat: 'otro' }, { name: 'Ajos horneados', pct: 8.5, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 225, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Bola 450g' } },

  { id: 'p12', name: 'Pan Campesino', category: 'Pan europeo', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Pie Francés', pct: 166, cat: 'otro' }, { name: 'Mantequilla', pct: 4, cat: 'grasa' }, { name: 'Azúcar', pct: 3, cat: 'azucar' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 225, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Batard 500g' } },

  { id: 'p13', name: 'Pan Sándwich Pullman', category: 'Pan de molde', poston: 1225, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 60, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 5, cat: 'azucar' }, { name: 'Mantequilla', pct: 4, cat: 'grasa' }, { name: 'Leche en polvo', pct: 3, cat: 'lacteo' }],
    proceso: { amasado: '0/2-4/2-1/2', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 0, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 15, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 60, tempInterna: 93, ovenType: 'Estático', vapor: false, notas: 'Molde Pullman 1225g' } },

  { id: 'p14', name: 'Pan trenzado leche', category: 'Pan enriquecido', poston: 360, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Leche', pct: 50, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 8, cat: 'azucar' }, { name: 'Mantequilla', pct: 6, cat: 'grasa' }, { name: 'Pie Francés', pct: 21, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 15, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 25, tempInterna: 88, ovenType: 'Estático', vapor: false, notas: 'Trenza 3 hebras 360g; barnizar huevo+azúcar' } },

  { id: 'p15', name: 'Pan Landbrot', category: 'Pan de centeno', poston: 450, preset: true,
    ingredients: [{ name: 'Harina de centeno (MMNL)', pct: 100, cat: 'harina' }, { name: 'Agua (MMNL)', pct: 125, cat: 'liquido' }, { name: 'MMNL siembra', pct: 100, cat: 'otro' }, { name: 'Harina panadera', pct: 80, cat: 'harina' }, { name: 'Harina de centeno', pct: 20, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'MMNL centeno', pct: 40, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento MMNL centeno', horas: 16, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 50, tempInterna: 95, ovenType: 'Convección', vapor: true, notas: 'Bola o batard 450g' } },

  { id: 'p16', name: 'Baguette', category: 'Pan francés', poston: 380, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 63, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Pie Francés', pct: 30, cat: 'otro' }],
    proceso: { amasado: '5/4', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 35, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 220, tiempo: 25, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: '4 vueltas de formado; barra 62cm; 4 incisiones diagonales 40-45°' } },

  { id: 'p17', name: 'Canilla venezolana', category: 'Pan venezolano', poston: 250, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 60, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 2, cat: 'azucar' }, { name: 'Manteca vegetal', pct: 4, cat: 'grasa' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 25, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Sin fermentación inicial; barra 250g' } },

  { id: 'p18', name: 'Pan con salvado', category: 'Pan integral', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 90, cat: 'harina' }, { name: 'Afrecho', pct: 10, cat: 'otro' }, { name: 'Agua', pct: 58, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Pie Francés', pct: 20, cat: 'otro' }, { name: 'Huevos', pct: 8, cat: 'huevo' }, { name: 'Ajonjolí (tope)', pct: 0, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 220, tiempo: 40, tempInterna: 93, ovenType: 'Estático', vapor: false, notas: 'Molde 500g; tope ajonjolí' } },

  { id: 'p19', name: 'Pan integral', category: 'Pan integral', poston: 500, preset: true,
    ingredients: [{ name: 'Harina integral', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 65, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Linaza', pct: 3, cat: 'otro' }, { name: 'Papelón rallado', pct: 1, cat: 'azucar' }, { name: 'Miel', pct: 7, cat: 'azucar' }, { name: 'Linaza (tope)', pct: 0, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 220, tiempo: 40, tempInterna: 93, ovenType: 'Estático', vapor: false, notas: 'Molde 500g; tope linaza' } },

  { id: 'p20', name: 'Focaccia', category: 'Pan italiano', poston: 750, preset: true,
    ingredients: [{ name: 'Harina panadera (Biga 125)', pct: 100, cat: 'harina' }, { name: 'Agua (Biga 125)', pct: 125, cat: 'liquido' }, { name: 'Levadura (Biga 125)', pct: 1, cat: 'levadura' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 65, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Aceite de oliva', pct: 5, cat: 'grasa' }, { name: 'Romero fresco', pct: 1.2, cat: 'otro' }, { name: 'Biga 125', pct: 50, cat: 'otro' }, { name: 'Sal gruesa (tope)', pct: 0, cat: 'sal' }, { name: 'Aceite oliva (post-horno)', pct: 0, cat: 'grasa' }],
    proceso: { amasado: '4/2', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Biga 125', horas: 18, mins: 0, temp: 25, tipo: 'Biga' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 30, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 45, tempInterna: 90, ovenType: 'Convección', vapor: true, notas: 'Plano rectangular; presionar con dedos hasta fondo; sal gruesa en hoyos; pintar aceite post-horno' } },

  { id: 'p21', name: 'Ciabatta', category: 'Pan italiano', poston: 350, preset: true,
    ingredients: [{ name: 'Harina panadera (Poolish)', pct: 100, cat: 'harina' }, { name: 'Agua (Poolish)', pct: 100, cat: 'liquido' }, { name: 'Levadura (Poolish)', pct: 0.1, cat: 'levadura' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 75, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Aceite de oliva', pct: 1.5, cat: 'grasa' }, { name: 'Poolish', pct: 165, cat: 'otro' }],
    proceso: { amasado: '4/2', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Poolish', horas: 18, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 240, tiempo: 25, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Zapatilla 12x20cm; masa muy húmeda' } },

  { id: 'p22', name: 'Pan Jalá (Challah)', category: 'Pan judío', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 45, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.5, cat: 'sal' }, { name: 'Azúcar', pct: 8, cat: 'azucar' }, { name: 'Miel', pct: 4, cat: 'azucar' }, { name: 'Huevos', pct: 21, cat: 'huevo' }, { name: 'Yemas', pct: 9, cat: 'huevo' }, { name: 'Aceite', pct: 10, cat: 'grasa' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 30, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Trenza doble x4 (300g+200g); barnizar huevo+ajonjolí' } },

  { id: 'p23', name: 'Bagels', category: 'Pan judío', poston: 115, preset: true,
    ingredients: [{ name: 'Harina panadera (Poolish)', pct: 100, cat: 'harina' }, { name: 'Agua (Poolish)', pct: 100, cat: 'liquido' }, { name: 'Levadura (Poolish)', pct: 0.1, cat: 'levadura' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 50, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Extracto de malta', pct: 5, cat: 'otro' }, { name: 'Poolish', pct: 42, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Poolish', horas: 18, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Retardo (nevera)', horas: 18, mins: 0, temp: 4, tipo: 'Retardo (nevera)' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: false, notas: 'Rosquilla 115g; cocción agua hirviendo+bicarbonato 1.5-3min/lado antes de hornear; topes semillas' } },

  { id: 'p24', name: 'Pan de queso', category: 'Pan relleno', poston: 220, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Grasa de tocineta', pct: 7.5, cat: 'grasa' }, { name: 'Queso (relleno)', pct: 200, cat: 'relleno' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 15, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Rollo/trenzado 220g; relleno queso 91% peso pastón' } },

  { id: 'p25', name: 'Pan de jamón', category: 'Pan relleno venezolano', poston: 350, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Cerveza Pilsen', pct: 40, cat: 'liquido' }, { name: 'Agua', pct: 25, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Papelón rallado', pct: 4, cat: 'azucar' }, { name: 'Pie Francés', pct: 30, cat: 'otro' }, { name: 'Jamón cocido (relleno)', pct: 100, cat: 'relleno' }, { name: 'Tocineta ahumada (relleno)', pct: 15, cat: 'relleno' }, { name: 'Pasas maceradas en vino (relleno)', pct: 18, cat: 'relleno' }, { name: 'Aceitunas (relleno)', pct: 18, cat: 'relleno' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 20, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Enrollado; pintar melao papelón diluido durante horneado; origen Caracas 1905' } },

  { id: 'p26', name: 'Pancitos Kaiser', category: 'Pan europeo', poston: 650, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 60, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Extracto de malta', pct: 2, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 45, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Bola enharinada base; corte estrella' } },

  { id: 'p27', name: 'Pan Vienés', category: 'Pan enriquecido', poston: 150, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Leche', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 2, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 5, cat: 'azucar' }, { name: 'Mantequilla', pct: 4, cat: 'grasa' }, { name: 'Leche en polvo', pct: 6, cat: 'lacteo' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 15, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Deli 150g; barnizar huevo+ajonjolí' } },

  { id: 'p28', name: 'Pan pesto albahaca', category: 'Pan especial', poston: 450, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 55, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Pie Francés', pct: 30, cat: 'otro' }, { name: 'Salsa pesto', pct: 12, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Batard 450g' } },

  { id: 'p29', name: 'Panettone', category: 'Pan festivo italiano', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (MMND con leche)', pct: 100, cat: 'harina' }, { name: 'Cerveza Pilsen (MMND)', pct: 53, cat: 'liquido' }, { name: 'Leche en polvo (MMND)', pct: 7, cat: 'lacteo' }, { name: 'MMND (siembra)', pct: 24, cat: 'otro' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 10, cat: 'liquido' }, { name: 'Malta', pct: 5, cat: 'otro' }, { name: 'Levadura', pct: 8.5, cat: 'levadura' }, { name: 'Sal', pct: 2.5, cat: 'sal' }, { name: 'Huevos', pct: 50, cat: 'huevo' }, { name: 'Mantequilla', pct: 52, cat: 'grasa' }, { name: 'Azúcar', pct: 37, cat: 'azucar' }, { name: 'Leche en polvo', pct: 3, cat: 'lacteo' }, { name: 'Agua de azahar', pct: 1.8, cat: 'liquido' }, { name: 'Chocolate', pct: 50, cat: 'otro' }, { name: 'Ciruelas pasas', pct: 20, cat: 'otro' }, { name: 'Naranja confitada', pct: 10, cat: 'otro' }, { name: 'Nueces', pct: 25, cat: 'otro' }, { name: 'Ralladura de limón', pct: 0.8, cat: 'otro' }, { name: 'MMND con leche', pct: 120, cat: 'otro' }],
    proceso: { amasado: '0/2-5/3-1/15-1/0', tempMasa: 22 },
    levado: [{ nombre: 'Pre-fermento MMND con leche', horas: 18, mins: 0, temp: 5, tipo: 'Biga' }, { nombre: 'Fermentación final', horas: 3, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 20, tempInterna: 85, ovenType: 'Estático', vapor: false, notas: 'Capuchón o molde engrasado; corte cruz+4 laterales con tijera; nuez mantequilla en corte central' } },

  { id: 'p30', name: 'Pan Multicereal', category: 'Pan especial', poston: 450, preset: true,
    ingredients: [{ name: 'Harina panadera (Biga 60)', pct: 100, cat: 'harina' }, { name: 'Cerveza Pilsen (Biga)', pct: 60, cat: 'liquido' }, { name: 'Levadura (Biga)', pct: 1, cat: 'levadura' }, { name: 'Harina panadera', pct: 85, cat: 'harina' }, { name: 'Harina de centeno', pct: 10, cat: 'harina' }, { name: 'Afrecho', pct: 5, cat: 'otro' }, { name: 'Agua', pct: 57.6, cat: 'liquido' }, { name: 'Levadura', pct: 2.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar', pct: 5, cat: 'azucar' }, { name: 'Miel', pct: 6, cat: 'azucar' }, { name: 'Mantequilla', pct: 3, cat: 'grasa' }, { name: 'Huevos', pct: 10, cat: 'huevo' }, { name: 'Leche en polvo', pct: 5, cat: 'lacteo' }, { name: 'Cereales en hojuelas', pct: 20, cat: 'otro' }, { name: 'Avena tostada en hojuelas', pct: 8, cat: 'otro' }, { name: 'Cereales cocidos', pct: 20, cat: 'otro' }, { name: 'Ajonjolí tostado', pct: 2, cat: 'otro' }, { name: 'Linaza tostada', pct: 2, cat: 'otro' }, { name: 'Biga 60', pct: 45, cat: 'otro' }],
    proceso: { amasado: '0/2-4/2-2/2-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Biga 60', horas: 18, mins: 0, temp: 5, tipo: 'Biga' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Bola 450g; pintar huevo; 3 incisiones diagonales 40-45°' } },

  { id: 'p31', name: 'Pan Musli', category: 'Pan especial', poston: 250, preset: true,
    ingredients: [{ name: 'Harina panadera (Biga 60)', pct: 100, cat: 'harina' }, { name: 'Cerveza Pilsen (Biga)', pct: 60, cat: 'liquido' }, { name: 'Levadura (Biga)', pct: 1.8, cat: 'levadura' }, { name: 'Harina panadera', pct: 95, cat: 'harina' }, { name: 'Afrecho', pct: 5, cat: 'otro' }, { name: 'Levadura', pct: 3, cat: 'levadura' }, { name: 'Malta', pct: 37, cat: 'otro' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Avena en hojuela tostada', pct: 15, cat: 'otro' }, { name: 'Leche en polvo', pct: 6, cat: 'lacteo' }, { name: 'Huevos', pct: 10, cat: 'huevo' }, { name: 'Papelón rallado', pct: 12, cat: 'azucar' }, { name: 'Miel', pct: 6, cat: 'azucar' }, { name: 'Mantequilla', pct: 4, cat: 'grasa' }, { name: 'Orejones de manzana', pct: 18, cat: 'otro' }, { name: 'Nueces troceadas', pct: 5, cat: 'otro' }, { name: 'Pasas hidratadas en vino', pct: 10, cat: 'otro' }, { name: 'Granola sin pasas', pct: 28, cat: 'otro' }, { name: 'Biga 60%', pct: 50, cat: 'otro' }],
    proceso: { amasado: '4/2-2/2-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Biga 60', horas: 18, mins: 0, temp: 5, tipo: 'Biga' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 35, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Bola 250g; granola remojada y escurrida; barnizar huevo; cubrir avena; 3 cortes paralelos 1cm' } },

  { id: 'p32', name: 'Pan Bordelais', category: 'Pan francés de campo', poston: 600, preset: true,
    ingredients: [{ name: 'Harina panadera (MMNL)', pct: 100, cat: 'harina' }, { name: 'Agua (MMNL)', pct: 125, cat: 'liquido' }, { name: 'Siembra Masa Madre (MMNL)', pct: 12.5, cat: 'otro' }, { name: 'Harina panadera', pct: 87, cat: 'harina' }, { name: 'Afrecho', pct: 3, cat: 'otro' }, { name: 'Harina de centeno', pct: 10, cat: 'harina' }, { name: 'Agua', pct: 52, cat: 'liquido' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'MMNL', pct: 30, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento MMNL', horas: 16, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 95, ovenType: 'Convección', vapor: true, notas: 'Bola 600g; espolvorear harina antes de cortes' } },

  { id: 'p33', name: 'Estrella dulce', category: 'Pan dulce', poston: 900, preset: true,
    ingredients: [{ name: 'Harina panadera (Biga 50)', pct: 100, cat: 'harina' }, { name: 'Agua (Biga 50)', pct: 50, cat: 'liquido' }, { name: 'Levadura (Biga 50)', pct: 1, cat: 'levadura' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 27, cat: 'liquido' }, { name: 'Levadura', pct: 2.7, cat: 'levadura' }, { name: 'Sal', pct: 1.2, cat: 'sal' }, { name: 'Azúcar', pct: 23, cat: 'azucar' }, { name: 'Leche en polvo', pct: 8, cat: 'lacteo' }, { name: 'Huevos', pct: 22, cat: 'huevo' }, { name: 'Mantequilla', pct: 15, cat: 'grasa' }, { name: 'Biga 50', pct: 22, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Biga 50', horas: 18, mins: 0, temp: 5, tipo: 'Biga' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 40, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Porciones 100g en U; trenza circular estrella; barnizar huevo+almendras fileteadas o azúcar' } },

  { id: 'p34', name: 'Rosca de fiesta', category: 'Pan dulce especial', poston: 525, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 39, cat: 'liquido' }, { name: 'Levadura', pct: 6, cat: 'levadura' }, { name: 'Sal', pct: 1, cat: 'sal' }, { name: 'Huevos', pct: 5, cat: 'huevo' }, { name: 'Malta', pct: 6, cat: 'otro' }, { name: 'Miel', pct: 6, cat: 'azucar' }, { name: 'Leche en polvo', pct: 4, cat: 'lacteo' }, { name: 'Guayabita molida', pct: 0.35, cat: 'otro' }, { name: 'Canela en polvo', pct: 0.15, cat: 'otro' }, { name: 'Azúcar', pct: 15, cat: 'azucar' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Higos turcos', pct: 10, cat: 'otro' }, { name: 'Ciruelas pasas', pct: 15, cat: 'otro' }, { name: 'Avellanas enteras', pct: 16, cat: 'otro' }],
    proceso: { amasado: '0/2-4/2-1/3-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 0, mins: 45, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 15, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 10, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 180, tiempo: 35, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Rosca a partir de barra; extremos delgados; lazo ocho incompleto; barnizar huevo; glaseado azúcar+sal gruesa+2min 200°C post-horno' } },

  { id: 'p35', name: 'Pan Provenzal con anchoas', category: 'Pan europeo', poston: 200, preset: true,
    ingredients: [{ name: 'Harina panadera (MMNL)', pct: 100, cat: 'harina' }, { name: 'Agua (MMNL)', pct: 125, cat: 'liquido' }, { name: 'Siembra Masa Madre (MMNL)', pct: 12.5, cat: 'otro' }, { name: 'Harina panadera', pct: 92, cat: 'harina' }, { name: 'Afrecho', pct: 3, cat: 'otro' }, { name: 'Harina de centeno', pct: 5, cat: 'harina' }, { name: 'Agua', pct: 51, cat: 'liquido' }, { name: 'Levadura', pct: 1, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Anchoas fileteadas', pct: 4, cat: 'otro' }, { name: 'Hierbas provenzales', pct: 0.2, cat: 'otro' }, { name: 'MMNL', pct: 30, cat: 'otro' }],
    proceso: { amasado: '4/2', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento MMNL', horas: 16, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 45, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Bola 200g' } },

  { id: 'p36', name: 'Pan de jojoto', category: 'Pan venezolano especial', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 30.5, cat: 'liquido' }, { name: 'Levadura', pct: 4, cat: 'levadura' }, { name: 'Sal', pct: 1.6, cat: 'sal' }, { name: 'Jojoto licuado', pct: 66, cat: 'liquido' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Azúcar', pct: 27, cat: 'azucar' }, { name: 'Leche en polvo', pct: 8, cat: 'lacteo' }, { name: 'Pie Francés', pct: 43, cat: 'otro' }],
    proceso: { amasado: '5/3-1/6', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 15, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 45, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Barra en molde; rectángulo 18x28x1.5cm enrollado; desmoldar+5min para reforzar costados' } },

  { id: 'p37', name: 'Pan Sobado', category: 'Pan venezolano', poston: 125, preset: true,
    ingredients: [{ name: 'Harina panadera (Biga 45)', pct: 100, cat: 'harina' }, { name: 'Agua (Biga 45)', pct: 45, cat: 'liquido' }, { name: 'Levadura (Biga 45)', pct: 1, cat: 'levadura' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 45, cat: 'liquido' }, { name: 'Levadura', pct: 4, cat: 'levadura' }, { name: 'Sal', pct: 3.6, cat: 'sal' }, { name: 'Azúcar', pct: 4, cat: 'azucar' }, { name: 'Extracto de malta', pct: 1, cat: 'otro' }, { name: 'Mantequilla', pct: 9, cat: 'grasa' }, { name: 'Biga 45', pct: 145, cat: 'otro' }],
    proceso: { amasado: '0/2-4/2-2/2', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Biga 45', horas: 18, mins: 0, temp: 5, tipo: 'Biga' }, { nombre: 'Fermentación inicial', horas: 0, mins: 10, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 10, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 25, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Deli 125g; barnizar huevo+ajonjolí+3 cortes diagonales' } },

  { id: 'p38', name: 'Pan Siciliano', category: 'Pan italiano', poston: 360, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Sémola fina', pct: 70, cat: 'harina' }, { name: 'Agua', pct: 2, cat: 'liquido' }, { name: 'Levadura', pct: 61, cat: 'levadura' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Aceite de oliva', pct: 6, cat: 'grasa' }, { name: 'Miel', pct: 6, cat: 'azucar' }, { name: 'Pie Francés', pct: 110, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 5, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 25, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Retardo (nevera)', horas: 18, mins: 0, temp: 4, tipo: 'Retardo (nevera)' }],
    coccion: { temp: 190, tiempo: 25, tempInterna: 90, ovenType: 'Convección', vapor: true, notas: 'Espiral doble en S; rociar agua+ajonjolí blanco+aceite oliva; fermentación final en nevera; barra 62cm' } },

  { id: 'p39', name: 'Anillo pancitos ajo/hierbas/quesos', category: 'Pan especial', poston: 65, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 46, cat: 'liquido' }, { name: 'Levadura', pct: 3, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Huevos', pct: 10, cat: 'huevo' }, { name: 'Mantequilla', pct: 8, cat: 'grasa' }, { name: 'Leche en polvo', pct: 2, cat: 'lacteo' }, { name: 'Queso parmesano rallado', pct: 8, cat: 'lacteo' }, { name: 'Queso blanco duro rallado', pct: 4, cat: 'lacteo' }, { name: 'Ajo fresco en pasta', pct: 3, cat: 'otro' }, { name: 'Hierbas provenzales', pct: 0.2, cat: 'otro' }],
    proceso: { amasado: '4/2-2/2-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 2, mins: 40, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 30, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Bola 65g en molde circular; anillo separación 0.5cm; barnizar huevo' } },

  { id: 'p40', name: 'Pan Naan', category: 'Pan plano', poston: 130, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 30, cat: 'liquido' }, { name: 'Levadura', pct: 3.5, cat: 'levadura' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Leche', pct: 4, cat: 'lacteo' }, { name: 'Aceite de oliva', pct: 5, cat: 'grasa' }, { name: 'Yogurt natural', pct: 35, cat: 'lacteo' }, { name: 'Miel', pct: 6, cat: 'azucar' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 10, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 0, mins: 15, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 230, tiempo: 10, tempInterna: 90, ovenType: 'Estático', vapor: true, notas: 'Plano 5-8mm; bandejas calientes precalentadas; pintar mantequilla clarificada post-horno; envolver en paños' } },

  { id: 'p41', name: 'Bollo dulce portugués', category: 'Pan dulce', poston: 450, preset: true,
    ingredients: [{ name: 'Harina panadera (Esponja)', pct: 100, cat: 'harina' }, { name: 'Agua (Esponja)', pct: 185, cat: 'liquido' }, { name: 'Levadura (Esponja)', pct: 23, cat: 'levadura' }, { name: 'Azúcar (Esponja)', pct: 31, cat: 'azucar' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 10, cat: 'liquido' }, { name: 'Levadura', pct: 1.5, cat: 'levadura' }, { name: 'Sal', pct: 1.8, cat: 'sal' }, { name: 'Azúcar avainillada', pct: 10, cat: 'azucar' }, { name: 'Azúcar', pct: 11, cat: 'azucar' }, { name: 'Mantequilla', pct: 16, cat: 'grasa' }, { name: 'Ralladura de limón', pct: 0.5, cat: 'otro' }, { name: 'Ralladura naranja amarga', pct: 1.2, cat: 'otro' }, { name: 'Huevos', pct: 25, cat: 'huevo' }, { name: 'Leche en polvo', pct: 9, cat: 'lacteo' }, { name: 'Esponja', pct: 58, cat: 'otro' }],
    proceso: { amasado: '0/2-5/3-1/10', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Esponja', horas: 1, mins: 10, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 2, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 2, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 175, tiempo: 25, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Bola en molde 20cm; T°interna 90°C; enfriar 90min mínimo' } },

  { id: 'p42', name: 'Fougasse con aceitunas', category: 'Pan francés provenzal', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (Poolish)', pct: 100, cat: 'harina' }, { name: 'Agua (Poolish)', pct: 100, cat: 'liquido' }, { name: 'Levadura (Poolish)', pct: 0.1, cat: 'levadura' }, { name: 'Harina panadera', pct: 85, cat: 'harina' }, { name: 'Harina de centeno', pct: 10, cat: 'harina' }, { name: 'Afrecho', pct: 5, cat: 'otro' }, { name: 'Agua', pct: 35, cat: 'liquido' }, { name: 'Levadura', pct: 1.8, cat: 'levadura' }, { name: 'Sal', pct: 2.6, cat: 'sal' }, { name: 'Aceitunas negras', pct: 5, cat: 'otro' }, { name: 'Tomillo fresco', pct: 1, cat: 'otro' }, { name: 'Poolish', pct: 82, cat: 'otro' }],
    proceso: { amasado: '4/2', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Poolish', horas: 18, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 0, mins: 50, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 240, tiempo: 25, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Batard luego aplanar; cortes venas de hoja; abrir con dedos; rociar agua+harina' } },

  { id: 'p43', name: 'Pan suave de parchita', category: 'Pan venezolano especial', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 97, cat: 'harina' }, { name: 'Afrecho', pct: 3, cat: 'otro' }, { name: 'Agua', pct: 18, cat: 'liquido' }, { name: 'Levadura', pct: 4, cat: 'levadura' }, { name: 'Sal', pct: 1, cat: 'sal' }, { name: 'Azúcar', pct: 30, cat: 'azucar' }, { name: 'Pulpa de parchita', pct: 22, cat: 'liquido' }, { name: 'Mantequilla', pct: 12, cat: 'grasa' }, { name: 'Huevos', pct: 10, cat: 'huevo' }],
    proceso: { amasado: '0/2-7/2-1/5', tempMasa: 24 },
    levado: [{ nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 24, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 24, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 30, temp: 24, tipo: 'Forma final' }],
    coccion: { temp: 180, tiempo: 40, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Barra en molde; parchita licuada+colada+azúcar; incorporar en min 5 del 2do ciclo; barnizar+cortes tijera; desmoldar+5min' } },

  { id: 'p44', name: 'Pan de campaña', category: 'Pan francés rústico', poston: 450, preset: true,
    ingredients: [{ name: 'Harina panadera (Pie Francés)', pct: 100, cat: 'harina' }, { name: 'Agua (Pie Francés)', pct: 63, cat: 'liquido' }, { name: 'Levadura (Pie Francés)', pct: 1, cat: 'levadura' }, { name: 'Sal (Pie Francés)', pct: 1.8, cat: 'sal' }, { name: 'Harina panadera', pct: 80, cat: 'harina' }, { name: 'Harina integral', pct: 20, cat: 'harina' }, { name: 'Agua', pct: 64, cat: 'liquido' }, { name: 'Levadura', pct: 0.8, cat: 'levadura' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Pie Francés', pct: 165, cat: 'otro' }],
    proceso: { amasado: '5/3', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Pie Francés', horas: 18, mins: 0, temp: 25, tipo: 'Pie francés' }, { nombre: 'Fermentación inicial', horas: 1, mins: 30, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 230, tiempo: 35, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Tabatiere 450g; rociar agua+espolvorear harina; 3 incisiones diagonales 8-9cm a 40-45°' } },

  { id: 'p45', name: 'Stollen', category: 'Pan festivo alemán', poston: 500, preset: true,
    ingredients: [{ name: 'Harina panadera (Esponja)', pct: 100, cat: 'harina' }, { name: 'Agua (Esponja)', pct: 145, cat: 'liquido' }, { name: 'Levadura (Esponja)', pct: 38.5, cat: 'levadura' }, { name: 'Leche en polvo (Esponja)', pct: 24, cat: 'lacteo' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 18, cat: 'liquido' }, { name: 'Sal', pct: 1.5, cat: 'sal' }, { name: 'Azúcar', pct: 15, cat: 'azucar' }, { name: 'Ralladura de limón', pct: 2, cat: 'otro' }, { name: 'Canela en polvo', pct: 1.5, cat: 'otro' }, { name: 'Huevos', pct: 17, cat: 'huevo' }, { name: 'Mantequilla', pct: 28, cat: 'grasa' }, { name: 'Frutas maceradas', pct: 120, cat: 'otro' }, { name: 'Almendras tostadas', pct: 20, cat: 'otro' }, { name: 'Esponja', pct: 70, cat: 'otro' }],
    proceso: { amasado: '0/2-4/2-1/8-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento Esponja', horas: 1, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Fermentación inicial', horas: 0, mins: 45, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 175, tiempo: 50, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Elipse 30x15x2cm; doblez con borde libre 3cm; mantequilla clarificada+azúcar glass abundante post-horno' } },

  { id: 'p46', name: 'Baguette autolisis', category: 'Pan francés', poston: 380, preset: true,
    ingredients: [{ name: 'Harina panadera (MMNL)', pct: 100, cat: 'harina' }, { name: 'Agua (MMNL)', pct: 125, cat: 'liquido' }, { name: 'Siembra Masa Madre (MMNL)', pct: 15, cat: 'otro' }, { name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 50, cat: 'liquido' }, { name: 'Sal', pct: 3.5, cat: 'sal' }, { name: 'Levadura', pct: 0.5, cat: 'levadura' }, { name: 'MMNL', pct: 48, cat: 'otro' }],
    proceso: { amasado: '5/0-5/4-1/0', tempMasa: 25 },
    levado: [{ nombre: 'Pre-fermento MMNL', horas: 16, mins: 0, temp: 25, tipo: 'Poolish' }, { nombre: 'Autólisis', horas: 1, mins: 0, temp: 25, tipo: 'Autólisis' }, { nombre: 'Fermentación inicial', horas: 0, mins: 0, temp: 25, tipo: 'Fermentación en bloque' }, { nombre: 'Pre-forma', horas: 0, mins: 20, temp: 25, tipo: 'Pre-forma' }, { nombre: 'Forma final', horas: 1, mins: 30, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 220, tiempo: 40, tempInterna: 93, ovenType: 'Convección', vapor: true, notas: 'Autólisis: solo harina+agua 60min; sal en min 4 del 2do ciclo; 4 vueltas formado; barra 62cm; 4 incisiones diagonales' } },

  { id: 'p47', name: 'Rosca rellena de res con mojito', category: 'Pan relleno', poston: 600, preset: true,
    ingredients: [{ name: 'Harina panadera', pct: 100, cat: 'harina' }, { name: 'Agua muy fría', pct: 16, cat: 'liquido' }, { name: 'Levadura', pct: 4.5, cat: 'levadura' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Huevos', pct: 38, cat: 'huevo' }, { name: 'Leche en polvo', pct: 4, cat: 'lacteo' }, { name: 'Azúcar', pct: 14, cat: 'azucar' }, { name: 'Mantequilla', pct: 28, cat: 'grasa' }, { name: 'Cebolla (relleno)', pct: 100, cat: 'relleno' }, { name: 'Zanahoria blanqueada (relleno)', pct: 50, cat: 'relleno' }, { name: 'Pimentón rojo (relleno)', pct: 16, cat: 'relleno' }, { name: 'Ají dulce rojo (relleno)', pct: 22, cat: 'relleno' }, { name: 'Ajoporro (relleno)', pct: 10, cat: 'relleno' }, { name: 'Celery blanqueado (relleno)', pct: 10, cat: 'relleno' }, { name: 'Aceite de oliva (relleno)', pct: 30, cat: 'relleno' }, { name: 'Miel (relleno)', pct: 10, cat: 'relleno' }, { name: 'Vinagre de jerez (relleno)', pct: 20, cat: 'relleno' }, { name: 'Cilantro fresco (relleno)', pct: 15, cat: 'relleno' }, { name: 'Pulpa negra cocida (relleno)', pct: 45, cat: 'relleno' }],
    proceso: { amasado: '0/2-5/3-1/15', tempMasa: 25 },
    levado: [{ nombre: 'Retardo (nevera)', horas: 18, mins: 0, temp: 4, tipo: 'Retardo (nevera)' }, { nombre: 'Forma final', horas: 1, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 190, tiempo: 35, tempInterna: 90, ovenType: 'Estático', vapor: false, notas: 'Congelar 18h; rectángulo 50x30cm; enrollar brazo gitano; rosca; relleno=65% pastón (390g); barnizar huevo; mojito reposa 48h' } },

  { id: 'p48', name: 'Pan sin gluten', category: 'Pan especial', poston: 0, preset: true,
    ingredients: [{ name: 'Harina de papa', pct: 100, cat: 'harina' }, { name: 'Agua', pct: 70, cat: 'liquido' }, { name: 'Levadura', pct: 5, cat: 'levadura' }, { name: 'Sal', pct: 2, cat: 'sal' }, { name: 'Leche en polvo', pct: 5, cat: 'lacteo' }, { name: 'Azúcar', pct: 2.5, cat: 'azucar' }, { name: 'Goma de guar', pct: 0.5, cat: 'otro' }, { name: 'Clara de huevo', pct: 20, cat: 'huevo' }],
    proceso: { amasado: 'Manual', tempMasa: 25 },
    levado: [{ nombre: 'Forma final', horas: 0, mins: 0, temp: 25, tipo: 'Forma final' }],
    coccion: { temp: 210, tiempo: 25, tempInterna: 90, ovenType: 'Convección', vapor: true, notas: 'Sin fermentación inicial; directo a molde; hornear hasta duplicar tamaño' } },
];

export const CATEGORIAS = ['Todas', ...Array.from(new Set(RECETAS.map(r => r.category)))];