introduction:
A WEB app that tracks purchases made across various online stores, and sorts them by product name and store name.
You can see this table which shows the details ordered with the date of arrival at the destination, and the cost of each item.
You can also see a summary of all purchases by store names and total price.
In addition, the prices of the items can be displayed in 2 types of exchange rates - dollar and shekel.

Technologies:
The app was written by React, and the state was managed using Redux and Hooks.
The information extracted from the API was performed using Axios
The user interface is designed using the Material-UI


Application structure:
The app architecture was pre-designed.
The data on the currency exchange rates is extracted from the API every 10 seconds making it constantly updated.
The item information, which is extracted from the API, contains information about 20 items. From this data I had to display a number of parameters some of which were not included in the API.
For the purpose of completing the information I created 2 functions which supplement the information randomly, and after designing the data - everything is saved in State which is managed using Redux and Hooks.

Once the information is saved, another data design is done within the State which is moved to another table that shows the orders by store names as well as the total price paid.