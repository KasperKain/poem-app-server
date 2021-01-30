function makePoems() {
  return [
    {
      id: 1,
      title: 'Poem-1',
      body: 'Body content goes here',
      style: 1,
    },
    {
      id: 2,
      title: 'Poem-2',
      body: 'Body content goes here',
      style: 2,
    },
    {
      id: 3,
      title: 'Poem-3',
      body: 'Body content goes here',
      style: 3,
    },
    {
      id: 4,
      title: 'Poem-4',
      body: 'Body content goes here',
      style: 4,
    },
  ];
}

function makeStyles() {
  return [
    {
      id: 1,
      head_style: 'mood_joy',
      body_style: 'temp_cold',
    },
    {
      id: 2,
      head_style: 'mood_peace',
      body_style: 'temp_cold',
    },
    {
      id: 3,
      head_style: 'mood_joy',
      body_style: 'temp_warm',
    },
    {
      id: 4,
      head_style: 'mood_anger',
      body_style: 'temp_hot',
    },
  ];
}

module.exports = {
  makePoems,
  makeStyles,
};
