# Demo issue — paste this as a new GitHub issue, then add the label `autofix`

**Title:** [bug] Long-stay discount makes the total smaller than the discount itself

**Body:**

## What happens
Quoting a 7-night stay in a triple room returns a total of **28 EUR**.

## What I expected
7 nights × 40 EUR = 280 EUR, minus the 10 % long-stay discount = **252 EUR**.

## How to reproduce (inputs → output)
```ts
import { quote } from "./src/booking";
quote("triple", "2027-07-10", "2027-07-17");
// → { nights: 7, subtotal: 280, discountPct: 10, total: 28 }   // expected total: 252
```
Short stays (no discount) are quoted correctly, so the bug only shows when a discount applies.
