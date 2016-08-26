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



  var bar2 = new ProgressBar.Circle('#progress2', {
    // var minutesVal = (+minutes.text()) *1000;
    color: '#FFEE58',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 60000,
    text: {
      autoStyleContainer: false
    },
  });

  var bar = new ProgressBar.Circle('#progress', {
    color: '#E82418',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 300000,
    text: {
      autoStyleContainer: false
    },

  });








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
    timerText.text("Zen Time");

    minutes.text('15');
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
    bar.animate(1,{duration: (+minutes.text()*60000)+ (+seconds.text()*1000) });
    bar2.animate(1); //duration 1 minute diefined above in the declaration


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
        bar2.set(0);
        bar2.animate(1);
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
