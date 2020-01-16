# Poker Hands Kata

Nodejs project that parses poker hands into a representative string. This project was mainly created to teach test-driven development and all services are backed by unit tests. The final product is integration tested. Unit and integration tests are done with jest.

Acceptance Criteria:

Create a function that evaluates a string representation of a poker hand. The hand will be made up of a space delineated list of cards. Cards are represented with two characters, the first being its rank, the second being its suit. The function will process the hand and return a valid string response with the type of hand.

Other Info:

Valid ranks = 2,3,4,5,6,7,8,9,T,J,Q,K,A

Valid suits = c (Clubs), d (Diamonds), h (Hearts), s (Spades)

Integration tests:

```
f("As Kd 8c 9d 2c") -> "High Card: Ace"
f("2c 6d Td Tc Js") -> "One Pair: Tens"
f("9c 7d 9d 7h 2c") -> "Two Pair: Nines and Sevens"
f("Qs Th Qc Qd 8h") -> "Three of a Kind: Queens"
f("6h 3c 5d 4s 7h") -> "Straight: Seven High"
f("9h 3h Qh Jh 6h") -> "Flush: Hearts, Queen High"
f("2c 2d 2s Td Tc") -> "Full House: Deuces over Tens"
f("Jh 8s Js Jd Jc") -> "Four of a Kind: Jacks"
f("6d 4d 7d 8d 5d") -> "Straight Flush: Diamonds, Eight High"
f("Jc Ac Kc Tc Qc") -> "Royal Flush: Clubs"
```

Source: [Poker hand rankings](https://www.cardplayer.com/rules-of-poker/hand-rankings)

# Installation and Operation

After cloning the repo, do an `npm install` to install jest. To run the unit tests use `npm run test`. There is also a random hand script that can be run with `node randoms-hand.js N`. with `N` being the number of hands to run.
