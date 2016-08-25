// window.onload = function onLoad() {
//     var circle = new ProgressBar.Circle('#progress', {
//         color: '#FCB03C',
//         duration: 3000,
//         easing: 'easeInOut'
//     });
//
//     circle.animate(1);
// };

$(document).ready(function(){
  var start = $('#start');
  var minutes = $('#minutes');
  var seconds = $('#seconds');
  var breakBtn = $('#break');
  var pauseBtn = $('#pause');
  var resetBtn = $('#reset');
  var plusBtn = $('#plus');
  var minusBtn = $('#minus');
  var timerText = $('#timerStateText');
  var countdown;



  var circle = new ProgressBar.Circle('#progress', {
      color: '#FCB03C',
      duration: 20000,
      easing: 'easeInOut'
  });

  // circle.animate(1);






  start.on('click',startCountdown);
  breakBtn.on('click',takeABreak);
  pauseBtn.on('click', pauseTimer);
  resetBtn.on('click', resetTimer);
  plusBtn.on('click', incTimer);
  minusBtn.on('click', decTimer);

  function incTimer(){
    var minutesVal = +minutes.text();
    minutes.text(minutesVal+1);

  }

  function decTimer(){
    var minutesVal = +minutes.text();

    if(minutesVal === 0){
      //Don't decrease
    }
    else{
      minutes.text(minutesVal-1);
    }
  }

  function resetTimer(){
    timerText.text("Work Time");

    minutes.text('25');
    seconds.text('00');
    stopCountdown();
  }

  function pauseTimer(){
    stopCountdown();
  }

  function takeABreak(){
    // alert("take a break");
    timerText.text("Break Time");

    minutes.text('05');
    seconds.text('00');
    // startCountdown();
    stopCountdown();
  }

  function stopCountdown(){
    clearInterval(countdown);
  }


  function startCountdown(){

    //starts drawing the circle
    circle.animate(1);


    countdown = setInterval(function(){
      var secondsVal = +seconds.text();//the plus sign makes this behave like a number
      var minutesVal = +minutes.text();
      if (secondsVal === 0 && minutesVal === 0) {
        console.log('end');
        breakBtn.removeClass('disabled');
        breakBtn.removeAttr('disabled');
        clearInterval(countdown);
        return;
      }
      if(secondsVal === 0){
        minutes.text(minutesVal-1);
        seconds.text(59);
      } else{
        if(secondsVal <= 10){
          seconds.text("0" + (secondsVal-1));
        } else{
          seconds.text(secondsVal - 1);
        }
      }

      // console.log(typeof +secondsVal);
    }, 1000)
  }




});
