# Web3 Points Example (WIP)

## Description

This project demonstrates how to build a "points" program or a loyalty program that rewards users for specific engagement and often intends to allow participants to redeem their rewards for a cryptocurrency. 

Some popular examples of points programs in the web3 ecosystem include [Rainbow](https://rainbow.me/points), [Eigenlayer](https://docs.eigenlayer.xyz/eigenlayer/restaking-guides/restaking-user-guide/restaked-point), and [Renzo](https://docs.renzoprotocol.com/docs/product/renzo-ezpoints). 

In these examples, users can earn points by using the different features on the dapps and transacting with the protocols (ex. swapping tokens, investing tokens, etc.). 

Dapps and protocols develop points programs to increase engagement, validate features, and track and analyze user activity, often with the intent of allowing users to redeem their points for a future token airdrop. 

To learn more about points programs in web3, please refer to the following articles:

- [Web3 Points: The Frontier of Community Building](https://www.samudai.xyz/page/web3-points-the-frontier-of-community-building)
- [Lessons on Points Programs for Crypto Apps](https://www.lisnewsletter.com/p/lessons-on-points-programs)
- [Crypto Points Systems Are a 100x Opportunity, But Founders, Be Wary](https://www.coindesk.com/tv/unchained/crypto-points-systems-are-a-100x-opportunity-but-founders-be-wary/)

## Building a points program

Teams who are looking to build a points program need the following:

1. **Define Earning Activities and Point Values**

- Outline user activities you want to incentivize (ex. purchases, referrals, etc.).
- Assign point values to each activity.

2. **Implement Point Tracking and Awarding**

- Develop a backend service to track user activity and identify activities associated with point rewards.

3. **Plan for Future Airdrops (Optional)**:

- If considering an airdrop, teams need to design a system for users to redeem their points. Consider establishing a clear conversion rate between points and tokens and a points-to-token redemption system.

## Demo Example 

This project showcases a dapp that allows a user to log in using Ethereum sign-in, earn points by updating their profile, and then redeem their points for an equivalent amount of $BERRY tokens. 

**Frontend**

The frontend application is built using [NextJS](https://nextjs.org/) and is deployed as an [ICP canister smart contract](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/overview/introduction). It integrates [IC-SIWE](https://github.com/kristoferlund/ic-siwe) to allow users to log in using their Ethereum wallet (ex. Metamask).

**Backend**

The backend application is an [ICP canister smart contract](https://internetcomputer.org/docs/current/developer-docs/smart-contracts/overview/introduction) written in [Typescript](https://internetcomputer.org/docs/current/developer-docs/backend/typescript/) using [Azle](https://demergent-labs.github.io/azle/the_azle_book.html). 

## Future Improvements 

Future features include:

- Converting points to an ERC-20 token



