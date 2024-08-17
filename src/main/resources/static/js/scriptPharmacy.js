let markers = [];

// 초기 위치 설정
const container = document.getElementById('map');
const center = new kakao.maps.LatLng(37.566826, 126.9786567);
const options = {
    center: center,
    level: 3
};
const map = new kakao.maps.Map(container, options);


////////////////////////////////////
//
// api로 데이터를 불러와 data 리스트에 저장
//
////////////////////////////////////
let data = [];

var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('Q0') + '=' + encodeURIComponent('대구광역시'); /**/
queryParams += '&' + encodeURIComponent('QT') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('ORD') + '=' + encodeURIComponent('NAME'); /**/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('2000'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        var responseText = this.responseText;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(responseText, 'text/xml');
        var items = xmlDoc.getElementsByTagName('item');

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var dutyAddr = item.getElementsByTagName('dutyAddr')[0]?.textContent || '';
            var dutyName = item.getElementsByTagName('dutyName')[0]?.textContent || '';
            var dutyTel1 = item.getElementsByTagName('dutyTel1')[0]?.textContent || '';
            var dutyTime1c = item.getElementsByTagName('dutyTime1c')[0]?.textContent || '';
            var dutyTime1s = item.getElementsByTagName('dutyTime1s')[0]?.textContent || '';
            var dutyTime2c = item.getElementsByTagName('dutyTime2c')[0]?.textContent || '';
            var dutyTime2s = item.getElementsByTagName('dutyTime2s')[0]?.textContent || '';
            var dutyTime3c = item.getElementsByTagName('dutyTime3c')[0]?.textContent || '';
            var dutyTime3s = item.getElementsByTagName('dutyTime3s')[0]?.textContent || '';
            var dutyTime4c = item.getElementsByTagName('dutyTime4c')[0]?.textContent || '';
            var dutyTime4s = item.getElementsByTagName('dutyTime4s')[0]?.textContent || '';
            var dutyTime5c = item.getElementsByTagName('dutyTime5c')[0]?.textContent || '';
            var dutyTime5s = item.getElementsByTagName('dutyTime5s')[0]?.textContent || '';
            var dutyTime6c = item.getElementsByTagName('dutyTime6c')[0]?.textContent || '';
            var dutyTime6s = item.getElementsByTagName('dutyTime6s')[0]?.textContent || '';
            var dutyTime7c = item.getElementsByTagName('dutyTime7c')[0]?.textContent || '';
            var dutyTime7s = item.getElementsByTagName('dutyTime7s')[0]?.textContent || '';
            var dutyTime8c = item.getElementsByTagName('dutyTime8c')[0]?.textContent || '';
            var dutyTime8s = item.getElementsByTagName('dutyTime8s')[0]?.textContent || '';
            var wgs84Lat = item.getElementsByTagName('wgs84Lat')[0]?.textContent || '';
            var wgs84Lon = item.getElementsByTagName('wgs84Lon')[0]?.textContent || '';

            var dataItem = {
                address: dutyAddr,
                name: dutyName,
                phone: dutyTel1,
                coordLat: wgs84Lat,
                coordLon: wgs84Lon
            };

            var dutyTime = {
                dutyTime1c: dutyTime1c,
                dutyTime2c: dutyTime2c,
                dutyTime3c: dutyTime3c,
                dutyTime4c: dutyTime4c,
                dutyTime5c: dutyTime5c,
                dutyTime6c: dutyTime6c,
                dutyTime7c: dutyTime7c,
                dutyTime8c: dutyTime8c,
                dutyTime1s: dutyTime1s,
                dutyTime2s: dutyTime2s,
                dutyTime3s: dutyTime3s,
                dutyTime4s: dutyTime4s,
                dutyTime5s: dutyTime5s,
                dutyTime6s: dutyTime6s,
                dutyTime7s: dutyTime7s,
                dutyTime8s: dutyTime8s,
            }

            data.push(dataItem);
            addMarkerByAddress(dataItem.name, dataItem.address, dataItem.phone, dataItem.coordLat, dataItem.coordLon, dutyTime);
        }
    }
};

xhr.send('');

////////////////////////////////////
//
// 오버레이
//
////////////////////////////////////


// 오버레이를 저장할 변수
let currentOverlay = null;

// 오버레이를 생성하고 반환하는 함수
function createOverlay(content, position) {
    const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: position,
        xAnchor: 0.5,
        yAnchor: 1,
        zIndex: 1
    });
    return overlay;
}

// 마커 클릭 이벤트 핸들러
function markerClickHandler(marker, name, address, phone, dutyTime) {
    if (currentOverlay) {
        currentOverlay.setMap(null); // 현재 표시된 오버레이 제거
    }

    var addressLink = 'https://map.kakao.com/link/search/' + encodeURIComponent(address);
    var content = '<div class="wrap">' +
        '    <div class="info" >' +
        '        <div class="title">' +
        '            ' + name +
        '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="https://us.123rf.com/450wm/martialred/martialred1609/martialred160900006/62747857-%EC%9C%A0%EB%9F%BD-%E2%80%8B%E2%80%8B%EB%85%B9%EC%8B%AD%EC%9E%90-%EC%95%BD%EA%B5%AD-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%95%B1-%EB%B0%8F-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%97%90-%EB%8C%80%ED%95%9C-%ED%8F%89%EB%A9%B4-%EC%95%84%EC%9D%B4%EC%BD%98%EC%97%90-%EC%84%9C%EB%AA%85.jpg?ver=6" width="73" height="70">' + // 이미지 샘플
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">' + address + '</div>' +
        '                <div class="jibun ellipsis">' + phone + '</div>' +
        '                <div class="jibun ellipsis">' + '월요일 '+ dutyTime.dutyTime1s +' - '+dutyTime.dutyTime1c + '</div>' +
        '                <div class="jibun ellipsis">' + '화요일 '+ dutyTime.dutyTime2s +' - '+dutyTime.dutyTime2c + '</div>' +
        '                <div class="jibun ellipsis">' + '수요일 '+ dutyTime.dutyTime3s +' - '+dutyTime.dutyTime3c + '</div>' +
        '                <div class="jibun ellipsis">' + '목요일 '+ dutyTime.dutyTime4s +' - '+dutyTime.dutyTime4c + '</div>' +
        '                <div class="jibun ellipsis">' + '금요일 '+ dutyTime.dutyTime5s +' - '+dutyTime.dutyTime5c + '</div>' +
        '                <div class="jibun ellipsis">' + '토요일 '+ dutyTime.dutyTime6s +' - '+dutyTime.dutyTime6c + '</div>' +
        '                <div class="jibun ellipsis">' + '일요일 '+ dutyTime.dutyTime7s +' - '+dutyTime.dutyTime7c + '</div>' +
        '                <div class="jibun ellipsis">' + '공휴일 '+ dutyTime.dutyTime8s +' - '+dutyTime.dutyTime8c + '</div>' +
        '                <div><a href="' + addressLink + '" target="_blank" class="link">도로명주소로 검색</a></div>' +
        '                <div><br></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    const overlay = createOverlay(content, marker.getPosition());
    overlay.setMap(map); // 새 오버레이 지도에 표시
    currentOverlay = overlay; // 현재 오버레이 객체 저장
}

// 마커 추가 함수
function addMarkerByAddress(name, address, phone, lat, lng, dutyTime) {
    var coords  = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({
        position: coords,
        map: map
    });
    markers.push(marker);

    // 마커 클릭 이벤트 등록
    kakao.maps.event.addListener(marker, 'click', function() {
        markerClickHandler(marker, name, address, phone, dutyTime);
        map.setCenter(marker.getPosition()); // 마커를 지도 중심으로 이동
    });
}


// 오버레이 닫기 함수
function closeOverlay() {
    if (currentOverlay) {
        currentOverlay.setMap(null); // 오버레이 제거
        currentOverlay = null; // 현재 오버레이 객체 초기화
    }
}


////////////////////////////////////
//
// 지도상 컨트롤 메뉴 삽입
//
////////////////////////////////////



// 지도 Zoom-In, Zoom-Out 기능을 지원하는 Zoom 컨트롤 추가
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


////////////////////////////////////
//
// 거리순 계산
//
////////////////////////////////////

// 현재 위치로 이동하는 함수
function goToCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const currentPosition = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.panTo(currentPosition);
            var imageSrc = '/images/currentPosition.png';
            imageSize = new kakao.maps.Size(40, 40);
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            const marker = new kakao.maps.Marker({
                position: currentPosition,
                map: map,
                image: markerImage
            });
            markers.push(marker);
            //map.setCenter(coords);
        }, error => {
            console.log('Failed to get current location:', error);
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

function searchData(area) {
    if (area === 'current') {
        // 현재 위치로 이동 버튼 클릭 이벤트 핸들러
        goToCurrentPosition();
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // 데이터의 거리 계산 및 저장
            data.forEach(item => {
                const distance = getDistance(latitude, longitude, item.coordLat, item.coordLon);
                item.distance = distance;
            });

            // 거리 기준으로 데이터 정렬
            const sortedData = data.sort((a, b) => a.distance - b.distance);

            // 테이블에 출력할 데이터 가져오기 (상위 10개)
            const tableData = sortedData.slice(0, 10);

            // 데이터 출력
            displayData(tableData);
        }, error => {
            console.log('Failed to get current location:', error);
        });
    }else {
        const filteredData = data.filter(item => item.address.includes(" "+area));
        displayData(filteredData);}
}


function displayData(data) {
    // 데이터 테이블 요소에 대한 참조 가져오기
    const table = document.getElementById('data-table');

    // 테이블 초기화
    table.innerHTML = '';

    // 테이블에 CSS 클래스 추가
    table.classList.add('data-table');

    // 헤더 행 생성
    const headerRow = document.createElement('tr');
    const headers = ['이름', '주소', '전화번호', '거리'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // 데이터 행 생성
    data.forEach(item => {
        const row = document.createElement('tr');

        // 테이블 데이터 셀 생성 및 추가
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const addressCell = document.createElement('td');
        addressCell.textContent = item.address;
        row.appendChild(addressCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = item.phone;
        row.appendChild(phoneCell);

        const distanceCell = document.createElement('td');
        const distance = item.distance ? item.distance.toFixed(2) : '0';
        distanceCell.textContent = `${distance} km`;
        row.appendChild(distanceCell);

        // row를 클릭하면 이름 정보를 띄우는 이벤트 리스너 추가
        row.addEventListener('click', () => {
            closeOverlay()
            item.LatLng
            map.setCenter(new kakao.maps.LatLng(item.coordLat, item.coordLon));
        });

        table.appendChild(row);
    });
}

// 두 지점 사이의 거리 계산 함수
function getDistance(lat1, lng1, lat2, lng2) {
    const latDiff = lat2 - lat1;
    const lngDiff = lng2 - lng1;
    return 100*(Math.sqrt(latDiff * latDiff + lngDiff * lngDiff));
}

