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
  var barCustomValue = 0;
  var bar2CustomValue = 0;



  var bar2 = new ProgressBar.Circle('#progress2', {
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
    bar.set(0);
    bar2.set(0);
    bar.value(0);
    bar2.value(0);
    barCustomValue = 0;
    bar2CustomValue = 0;

    timerText.text("Zen Time");

    minutes.text('05');
    seconds.text('00');
    stopCountdown();
  }

  function pauseTimer(){
    bar.stop();
    bar2.stop();
    console.log(bar.value());
    console.log(bar2.value());
    barCustomValue = bar.value();
    bar2CustomValue = bar2.value();
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
    bar.set(barCustomValue);
    bar2.set(bar2CustomValue);
    //starts drawing the circle
    bar.animate(1, {duration: (+minutes.text()*60000)+ (+seconds.text()*1000) });
    bar2.animate(1, {duration: (+seconds.text()*1000) }); //duration 1 minute diefined above in the declaration


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
        //Play the Ping and reset the progressbar at every 1 minute interval
        var audio = new Audio('audio/timer_ting.mp3');
        audio.play();

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
