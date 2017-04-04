var accounts = {};

function BankAccount(name, password, accountbalance) {
  this.name = name;
  this.password = password;
  this.accountBalance = parseInt(accountbalance);
}

function createAccount(name, password) {
  var newAccount = new BankAccount(name, password, 0);
  accounts[name] = newAccount;
  // console.log(accounts);
}

function login(name, password){
  if (accounts[name]) {
    if (accounts[name].password=== password){
      return true;
    }
    else{
      return false;
      alert('invalid password');
    }
  } else{
    createAccount(name, password);
    alert("an account has been created")
    login(name, password);
  }
}

$(document).ready(function() {
  $("#deposit").hide()
  $("#display").hide()
  var name = "";
  var password = "";
  var deposit = 0;
  $('#login').submit(function(event){
    event.preventDefault();
    name = $('#name').val();
    password = $('#password').val();
    if (login(name,password)!=false) {
      $("#deposit").show();
      $("#login").hide();
      $("#display").show()
      $("#nameShow").text('Hello '+name+',');
      $("#balanceShow").text('Your balance is: $ ' + accounts[name].accountBalance);
    }
    else {
      alert("invalid login");
      name = "";
      password = "";
    }
    $('#login')[0].reset();
  });

  $('#deposit').submit(function(event){
    event.preventDefault();
    var deposit = parseInt($('#deposits').val());
    accounts[name].accountBalance += deposit
    console.log(accounts)
    $("#balanceShow").text('Your balance is: $ ' + accounts[name].accountBalance);
    $('#deposit')[0].reset();
  });

  $("#logout").click(function(){
    $("#display").hide()
    $("#deposit").hide();
    $("#login").show();
    name = "";
    password = "";

  });
});
