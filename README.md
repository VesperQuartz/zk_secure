# Reddit Marketplace, Powered by zkPass
[zk_pass.webm](https://github.com/user-attachments/assets/e375aa81-e5ce-4e64-a63f-cf8c6a55699e)

### deployment link
[zk_secure](https://zk-secure.vercel.app/)

# Introduction

Buying and selling online can be tricky how do you know if you can trust the other person? Our app aims to solve that problem by creating a secure, trusted marketplace specifically for Reddit users.

Using zkPass, a cutting-edge technology, we make sure that only verified Reddit accounts can participate. The best part? Users can prove they’re trustworthy without sharing personal details or compromising their privacy.

This marketplace is designed for people who want to sell digital goods, like design assets or e-books, while building on the reputation they've already earned on Reddit. It’s a space where buyers and sellers can feel confident, knowing the platform is built on both trust and privacy.

# Problem Statement

Online marketplaces often face a significant trust gap between buyers and sellers. Many platforms rely on user ratings, reviews, or lengthy verification processes, but these approaches have their limitations. Sellers may struggle to prove their credibility, and buyers risk falling victim to scams or low-quality transactions.

For Reddit users, this challenge is even greater. While Reddit communities often have vibrant economies, there’s no built-in system to verify a user’s trustworthiness based on their Reddit activity. Traditional verification methods compromise privacy by requiring sensitive information, creating a barrier for users who value anonymity.

This app tackles these issues by integrating zkPass, enabling Reddit users to verify their reputation and credibility without exposing personal details. By combining trust, privacy, and ease of use, we aim to make buying and selling digital goods simpler and safer for everyone.

# Issues Faced with zkPass on this project

This app is supposed to have another functionality where, sellers (Reddit users) have to verify using zkPass that their Reddit Karma is at a
certian level before they can sell their digital goods. This is to ensure that the seller is a trusted user on Reddit with high reputation. However, Some issues was faced
while trying to implement this with zkPass, even though the schema was correct and verified by zkPass itself.

### Structure of the schema.

```json
{
  "issuer": "Reddit",
  "desc": "Schema",
  "website": "https://www.reddit.com/message/messages",
  "breakWall": true,
  "APIs": [
    {
      "host": "gql-fed.reddit.com",
      "intercept": {
        "url": "/",
        "method": "POST"
      },
      "assert": [
        {
          "key": "data|redditorsInfoByIds|4|karma|total",
          "value": "5000",
          "operation": ">"
        }
      ],
      "nullifier": "data|redditorsInfoByIds|4|displayName"
    }
  ],
  "HRCondition": [
    "Karma > 5000"
  ],
  "tips": {
    "message": "When you successfully log in, please click the 'Start' button to initiate the verification process."
  },
  "category": "Social",
  "id": "0x08022af28d094e7d9e9f3bd53874de45"
}
```
So this is it, i couldn't implement this feature. and the schema that zkPass provided for Reddit karma didn't work either. as reddit has
changed it api i think. But this my implementation should work but it didn't.

## Technologies Used
 1. React (Nextjs)
 2. Tailwind CSS
 3. zkPass [zkpass](https://dev.zkpass.org/)
 4. Hono
