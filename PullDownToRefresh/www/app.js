var num = 0;
document.getElementById('scroller').addEventListener('scroll', function (evt) {
    if (this.scrollTop < -40) {
        document.getElementById('pull-to-refresh').classList.add('pulling');
    } else {
        document.getElementById('pull-to-refresh').classList.remove('pulling');
    }
});
document.getElementById('scroller').addEventListener('touchend', function (evt) {
    if (document.getElementById('pull-to-refresh').classList.contains('pulling')) {
        setTimeout(function() {
            num = num + 1;
            var line = document.createElement('div');
            line.className = 'lineItem';
            line.innerText = 'New line ' + num;
            document.getElementById('inner').insertBefore(line, document.getElementById('pull-to-refresh').nextSibling);
        }, 1);
    }
});