export const db = {
  artists: [
    {
      id: '1ca52c3c-e18e-4135-b004-40bbb62efccb',
      name: 'Saturnus',
      grammy: true,
    },
    {
      id: '71d24b57-a419-4007-9c44-4c2fdc7297eb',
      name: 'Behemot',
      grammy: false,
    },
  ],
  users: [
    {
      id: '1ca52c3c-e18e-4135-b004-40bbb62efccb',
      login: 'Jackson',
      password: '123456',
      version: 1,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    },
    {
      id: '71d24b57-a419-4007-9c44-4c2fdc7297eb',
      login: 'Foxbat',
      password: 'qwerty',
      version: 4,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    },
  ],
  tracks: [
    {
      id: '1ca52c3c-e18e-4135-b004-40bb62efceee',
      name: 'Track #1',
      artistId: '71d24b57-a419-4507-9c44-4c2fdc729aaa',
      albumId: '71c24b57-b219-4007-9c44-4c2fdc729bbb',
      duration: 50000,
    },
    {
      id: '1ca52c3c-e18e-4135-b004-40bbb62efccc',
      name: 'Track #2',
      artistId: '71d24b57-a419-4507-9c44-4c2fdc729ddd',
      albumId: '71c24b57-b219-4007-9c44-4c2fdc729dff',
      duration: 50000,
    },
  ],
};
