function toggleReportType(type) {
    console.log(type);
    switch(parseInt(type)) {
        case 2:
            console.log('show');
            document.getElementById('custom-report').style.display = 'block';
            break;
        default:
            console.log('hide');
            document.getElementById('custom-report').style.display = 'none';
    }
}