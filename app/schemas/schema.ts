export const exampleSchema = {
  category: "Social",
  issuer: "Tiktok",
  desc: "TikTok is a video-sharing app that allows users to create and share short-form videos on any topic.",
  website: "https://www.tiktok.com",
  APIs: [
    {
      host: "www.tiktok.com",
      intercept: {
        url: "passport/web/account/info/",
        method: "GET",
      },
      assert: [
        {
          key: "data|create_time",
          value: "1690848000",
          operation: "<",
        },
      ],
      nullifier: "data|user_id_str",
    },
  ],
  tips: {
    message:
      "When you successfully log in, please click the 'Start' button to initiate the verification process.",
  },
};
