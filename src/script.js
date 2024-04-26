const roundWayRadio = document.getElementById('roundWay');
        const oneWayRadio = document.getElementById('oneWay');
        const roundWayContent = document.getElementById('roundWayContent');
        const oneWayContent = document.getElementById('oneWayContent');

        roundWayRadio.addEventListener('change', function() {
            roundWayContent.classList.add('active');
            oneWayContent.classList.remove('active');
        });

        oneWayRadio.addEventListener('change', function() {
            oneWayContent.classList.add('active');
            roundWayContent.classList.remove('active');
        });
        document.addEventListener("DOMContentLoaded", function() {
            const flightRadio = document.getElementById('flight');
            const railwayRadio = document.getElementById('railway');
            const busRadio = document.getElementById('bus');
            const taxiRadio = document.getElementById('taxi');
            
            const flightOption = document.getElementById('flightOption');
            const railwayOption = document.getElementById('railwayOption');
            const busOption = document.getElementById('busOption');
            const taxiOption = document.getElementById('taxiOption');
    
            flightRadio.addEventListener('change', function() {
                flightOption.classList.add('active');
                railwayOption.classList.remove('active');
                busOption.classList.remove('active');
                taxiOption.classList.remove('active');
            });
    
            railwayRadio.addEventListener('change', function() {
                flightOption.classList.remove('active');
                railwayOption.classList.add('active');
                busOption.classList.remove('active');
                taxiOption.classList.remove('active');
            });
    
            busRadio.addEventListener('change', function() {
                flightOption.classList.remove('active');
                railwayOption.classList.remove('active');
                busOption.classList.add('active');
                taxiOption.classList.remove('active');
            });
    
            taxiRadio.addEventListener('change', function() {
                flightOption.classList.remove('active');
                railwayOption.classList.remove('active');
                busOption.classList.remove('active');
                taxiOption.classList.add('active');
            });
        });