const makeStylesArray = () => {
  return [
    {
      id: 1,
      head_style: 'mood_joy',
      body_style: 'temp_cold',
    },
    {
      id: 2,
      head_style: 'mood_sorrow',
      body_style: 'temp_cold',
    },
    {
      id: 3,
      head_style: 'mood_joy',
      body_style: 'temp_warm',
    },
  ];
};

const makePoemsArray = (styles) => {
  return [
    {
      id: 1,
      title: 'title 1',
      body: 'body 2',
      style: 1,
    },

    {
      id: 2,
      title: 'title 1',
      body: 'body 2',
      style: 2,
    },

    {
      id: 3,
      title: 'title 1',
      body: 'body 2',
      style: 3,
    },
  ];
};

const seedDB = async (db) => {
  await db.into('styles').insert(makeStylesArray());
  await db.into('poems').insert(makePoemsArray());
};

module.exports = {
  makeStylesArray,
  makePoemsArray,
  seedDB,
};
