console.log("Testing");
let totalAmount = 0;
let users = {
    user1: {
        pin: 1234,
        movements: [200, 400, -500, 100, 800],   
    },
    user2: {
        pin: 1234,
        movements: [200, 400, -300, 100, 800],
    },
    user3: {
        pin: 1234,
        movements: [200, 400, -500, 100, 800],
    },
    user4: {
        pin: 1234,
        movements: [200, 400, -500, 100, 800],
    }
};
let insertStatement2 = " ", insertStatement3 = " ";
let currentUser = "";
let currentPin = 0;
let transferName  = ""
const dt = new Date();
const dateString = dt.toString();
const dtr = dateString.substring(0, dateString.indexOf('GMT'));
const select_date1 = document.querySelector(".date1");
select_date1.textContent = dtr;

const select_left_table = document.querySelector(".left_table");
const select_User_Name = document.querySelector(".User_Name");
const select_user_id = document.querySelector("#user_id");
const select_pin_id = document.querySelector("#pin_id");
const user_click = document.querySelector(".userclick");
const select_trasfer_Click = document.querySelector(".trasfer_Click");
const select_transfer_name = document.querySelector("#transfer_name");
const select_transfer_acount = document.querySelector("#transfer_acount");
const select_loan_amount = document.querySelector("#loan_amount");
const select_loan_click = document.querySelector(".loan_click");
 const select_balance_print = document.querySelector("#balance_print");
 const select_close_click = document.querySelector(".close_click");
 select_balance_print.textContent = `$ 0`;
select_left_table.textContent = "";


function displayStatement(userobj, pin1)
{
    let array1 = userobj.movements;
    if(userobj.pin == pin1)
    {
    console.log(array1);
   for(let index = 0; index < array1.length; index++)
   {
       let current = array1[index];
        let check = current < 0 ? "widthrawal" : "deposit";
        const insertStatement = 
       `<div class = "template">   
        <div class = "template__${check}"> ${index+1} ${check} ${transferName}</div>
        <div class = "Amount_${check}">${current}</div>
      </div>`;
      select_left_table.insertAdjacentHTML('afterbegin', insertStatement);
     totalAmount = totalAmount + Number(current);
    }
    select_balance_print.textContent = ` $ ${totalAmount}`;
}
else
{   document.querySelector(".user_info").textContent = "Wrong Pin: Please Re-enter";
}
}

user_click.addEventListener("click", function() {
   
   
    select_left_table.textContent = "";
    totalAmount = 0;
    select_balance_print.textContent = `$ 0`;
    document.querySelector(".account_closed").textContent = " ";
    let userId = select_user_id.value;
    let userPin = select_pin_id.value;
    select_User_Name.textContent = `Welcome  ${userId} !`;
    
    let user = users[userId]; 
    currentUser = users[userId];
        currentPin = userPin;
    if (user) {
        displayStatement(user, userPin);
        
        

    } else {
        
       document.querySelector(".user_info").textContent = "No User Found";
    }
   
});


select_trasfer_Click.addEventListener("click", function( )
{
    select_left_table.textContent = "";
    select_balance_print.textContent = `$ 0`;
    totalAmount = 0;
    document.querySelector(".account_closed").textContent = " ";
    let selectName = select_transfer_name.value;
    transferName = selectName;
    let selectAmount = Number(select_transfer_acount.value);
    let negativeAmount =   -Math.abs(selectAmount);
     currentUser.movements.push(negativeAmount);
     displayStatement(currentUser, currentPin);

});

select_loan_click.addEventListener("click", function( )
{
     transferName = " ";
    select_left_table.textContent = "";
    select_balance_print.textContent = `$ 0`;
    totalAmount = 0;
    document.querySelector(".account_closed").textContent = " ";
    let selectAmount = Number(select_loan_amount.value);
    let positiveAmount =  Math.abs(selectAmount);
     currentUser.movements.push(positiveAmount);
     displayStatement(currentUser, currentPin);

});

// * <input type = "text" id = "enter_pin">
/* <input type = "text" id = "confirm_pin"> */ 


select_close_click.addEventListener("click", function( )
{
     transferName = " ";
  let   select_close_pin = document.querySelector("#enter_pin");
   let  select_confirm_pin = document.querySelector("#confirm_pin");

    if(select_close_pin.value == select_confirm_pin.value)
    {

        if(select_close_pin.value == currentPin)
        {
            let userId2 = select_user_id.value;
            delete users[userId2];
        document.querySelector(".account_closed").textContent = "Account Closed";
         
         select_left_table.textContent = "";
          select_balance_print.textContent = `$ 0`;
         totalAmount = 0;

        }
        
    }


})

document.querySelector(".create_account").addEventListener("click", function( )
{

    document.querySelector(".account_form").style.display = "flex"
    
})

const select_account = document.querySelector(".account");
select_account.addEventListener("click", function( )
{
    var name1 = document.getElementById("name").value;
    var username1 = document.getElementById("username").value;
    var pin1 = document.getElementById("pin").value;
    var deposit2 = document.getElementById("deposit").value;

    if(name1 && username1 && pin1 && deposit2)
    {
        document.querySelector(".account_form").style.display = "none";

        var newUser = { };
        
        newUser.pin = pin1;
        newUser.movements = [deposit2];
        users[username1] = newUser;
        console.log(users);
    }
    else{
        document.querySelector(".error").textContent = "Error Please Fill All Field";
    }
    
})
