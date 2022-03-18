export const nftEditions = [
  {
    amount: 1000,
    editions: [
      {
        name: "Limited",
        address: "t1LQ2M2hqBgmYMaJtDDiXbZu9K6xYHAxERRy1FdLSUL",
        limit: 2096,
        current: 0,
      },
      {
        name: "Regular",
        address: "t1R9vCvayEu5vmtr5qeYPaJkLiaYAueNDj9ynBCJH8o",
        limit: 209600,
        current: 0,
      },
    ],
  },
  {
    amount: 5000,
    editions: [
      {
        name: "Limited",
        address: "t2LqfNN5QbKgrYsgiWsbtYrJtaCMkPeQKeqD2hu6gs3",
        limit: 888,
        current: 0,
      },
      {
        name: "Regular",
        address: "t2RrocwqDxK3Eoo3WnxMezUE6m37Zv7swXgjXQdKKHd",
        limit: 88800,
        current: 0,
      },
    ],
  },
  {
    amount: 25000,
    editions: [
      {
        name: "Limited",
        address: "t3Ly8HSX2b13NsoSiK1BgYU4QGXm8rnSty88VLRPtZz",
        limit: 303,
        current: 0,
      },
      {
        name: "Regular",
        address: "t3RAXgx3tbrziorcDfrT7drXw1rswPFD9WmFUKbT5Xe",
        limit: 30300,
        current: 0,
      },
    ],
  },
  {
    amount: 100000,
    editions: [
      {
        name: "Limited",
        address: "t4LfTq89cZbyQM6hEYHX3c58gohdaS2yywNiHq6cfys",
        limit: 33,
        current: 0,
      },
      {
        name: "Regular",
        address: "t4RN3wxpHpfKqFoPAUHMfs1Qm9uunjznwf9MxaMu4P9",
        limit: 3300,
        current: 0,
      },
    ],
  },
  {
    amount: 250000,
    editions: [
      {
        name: "Limited",
        address: "t5LUtNDPwuf4Uu9ex3kq8tgF3vTwnnFAPw85ymbstU4",
        limit: 13,
        current: 0,
      },
      {
        name: "Regular",
        address: "t5RdXv5dPNjq5qi9cdUJzAYYGCXrF6W2Hy94pRgQPe4",
        limit: 1300,
        current: 0,
      },
    ],
  },
];

export type NftEditions = typeof nftEditions[keyof typeof nftEditions];
