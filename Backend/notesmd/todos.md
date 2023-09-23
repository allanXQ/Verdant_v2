## Urgent

1. The password reset link isnt working. email is sent but the reset url is wrong

## Minor Changes

1. Check if we can combine all the client history pages into one component.
2. Check on the reusable mongoose queries
3. Centralised res 200 handling
4. Defaulted loans logic
5. sellOrder and buyOrder are too similar. Create a single function to handle both
6. selllimit and buylimit are too similar. Create a single function to handle both
7. Check if we can get buyer or seller id based on the orderId and prevent sending of these ids when creating buy or sell limit order

## Functionality

1. Request loans logic
2. Add admin portfolio. Is the default portfolio in which all new assets go to. admin can then sell to other users.
3. Check getassets controller.