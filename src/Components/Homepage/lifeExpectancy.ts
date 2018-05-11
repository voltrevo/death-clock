const data = [
  [100000, 100000],
  [99643, 99670],
  [99614, 99648],
  [99599, 99635],
  [99585, 99624],
  [99573, 99614],
  [99562, 99606],
  [99553, 99598],
  [99544, 99591],
  [99536, 99584],
  [99528, 99577],
  [99520, 99570],
  [99512, 99563],
  [99502, 99554],
  [99490, 99544],
  [99474, 99531],
  [99452, 99516],
  [99422, 99498],
  [99384, 99478],
  [99339, 99457],
  [99288, 99435],
  [99232, 99412],
  [99174, 99388],
  [99114, 99365],
  [99052, 99340],
  [98988, 99314],
  [98924, 99288],
  [98859, 99260],
  [98792, 99231],
  [98723, 99200],
  [98650, 99168],
  [98574, 99132],
  [98493, 99093],
  [98408, 99051],
  [98317, 99005],
  [98220, 98955],
  [98117, 98901],
  [98008, 98844],
  [97893, 98782],
  [97772, 98716],
  [97643, 98645],
  [97504, 98568],
  [97354, 98484],
  [97193, 98393],
  [97022, 98292],
  [96840, 98183],
  [96647, 98064],
  [96440, 97936],
  [96215, 97797],
  [95971, 97647],
  [95706, 97485],
  [95421, 97310],
  [95114, 97119],
  [94782, 96911],
  [94424, 96686],
  [94034, 96442],
  [93613, 96181],
  [93158, 95900],
  [92667, 95597],
  [92136, 95272],
  [91564, 94921],
  [90946, 94543],
  [90282, 94137],
  [89568, 93701],
  [88802, 93231],
  [87978, 92723],
  [87090, 92170],
  [86133, 91563],
  [85096, 90895],
  [83968, 90161],
  [82741, 89353],
  [81406, 88465],
  [79954, 87487],
  [78374, 86410],
  [76655, 85221],
  [74784, 83903],
  [72753, 82444],
  [70551, 80832],
  [68166, 79055],
  [65588, 77097],
  [62801, 74936],
  [59791, 72547],
  [56554, 69903],
  [53097, 66978],
  [49434, 63754],
  [45581, 60223],
  [41568, 56395],
  [37439, 52292],
  [33259, 47941],
  [29104, 43384],
  [25052, 38675],
  [21180, 33894],
  [17560, 29148],
  [14257, 24556],
  [11324, 20229],
  [8795, 16265],
  [6694, 12747],
  [4985, 9722],
  [3618, 7208],
  [2547, 5194],
  [1732, 3639],

  // Extrapolation with survival decaying by 10% each year
  [1060, 2294],
  [583, 1301],
  [289, 664],
  [128, 305],
  [51, 126],
  [18, 46],
  [5, 15],
  [1, 4],
  [0, 1],
  [0, 0],
];

function interpolate(a: number, x: number, b: number) {
  return a + ((b - a) * x);
}

function sexIndex(sex: 'm' | 'f'): number {
  switch (sex) {
    case 'm': return 0;
    case 'f': return 1;
  }
}

function numPeople(sex: 'm' | 'f', age: number) {
  const si = sexIndex(sex);

  if (age > 110) {
    return 0;
  }

  const ageLow = Math.floor(age);
  const ageHigh = Math.ceil(age);

  return interpolate(data[ageLow][si], age - ageLow, data[ageHigh][si]);
}

function survivalRate(sex: 'm' | 'f', ageStart: number, ageEnd: number) {
  const nStart = numPeople(sex, ageStart);
  const nEnd = numPeople(sex, ageEnd);

  return nEnd / nStart;
}

const lifeExpectancy = (age: number, sex: 'm' | 'f'): number => {
  if (age < 0) {
    return -age + lifeExpectancy(0, sex);
  }

  let lifeExp = 0;
  let proportion = 1;

  for (let i = 1; age + i <= 110; i++) {
    const aliveProp = proportion * survivalRate(sex, age + i - 1, age + i);
    const deadProp = proportion - aliveProp;
    const deadAverageAge = age + i - 0.5;
    lifeExp += deadProp * deadAverageAge;
    proportion = aliveProp;
  }

  return lifeExp;
};

export default lifeExpectancy;
