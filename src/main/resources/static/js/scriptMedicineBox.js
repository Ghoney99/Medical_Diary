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
const urls = {
    '서구': 'https://api.odcloud.kr/api/15112956/v1/uddi:9392b675-e632-47e5-809a-e69a926b1d17?page=1&perPage=1000&serviceKey=R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D',
    '달성군': 'https://api.odcloud.kr/api/15113143/v1/uddi:c0d2cd21-f081-4d2c-81bd-d8ab18e74883?page=1&perPage=1000&serviceKey=R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D',
    '북구': 'https://api.odcloud.kr/api/15113020/v1/uddi:f6ebd1a8-23ce-46ee-be13-be3650c592d2?page=1&perPage=1000&serviceKey=R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D',
    '중구': 'https://api.odcloud.kr/api/15113008/v1/uddi:ebad7b3b-0abc-41b9-908c-ef5a5673cb82?page=1&perPage=1000&serviceKey=R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D',
    '수성구': 'https://api.odcloud.kr/api/15113103/v1/uddi:01272062-5cdb-48c4-ad43-f23360ba3807?page=1&perPage=1000&serviceKey=R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D',
    '남구': 'https://api.odcloud.kr/api/15113095/v1/uddi:e76b98b5-9602-41b1-a362-ae28d26237ba?page=1&perPage=1000&serviceKey=R23Qsfh7ikGmK%2Bjusy8V%2BdtfQnsIyk4eesAelagVJ8H0sQL0N01s54uRQWpFAJZkGWWVhEcs38GXMXq3dA4p6w%3D%3D'
}
  
const district = ["중구", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구"];

// 데이터를 저장할 배열
const data = [];

// API로부터 데이터를 가져와서 배열에 저장하는 함수
function fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          const items = result.data;
          items.forEach(item => {
            const name = item.기관명칭 || item.관할기관 || item.상호 || item.기관명;
            const address = item.도로명주소 || item.주소 || item.소재지;
            const phone = item.전화번호 || item.연락처;
  
            // Geocode the address to get the coordinates
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                addMarkerByAddress(name, address, phone, coords);
                data.push({ name, address, phone, coords });
              } else {
                console.log(`Failed to convert address: ${status}`);
              }
            });
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
// 모든 district의 데이터를 저장합니다.
function fetchAllData() {
  const promises = district.map(districtName => {
    const url = urls[districtName];
    if (url) {
      return fetchData(url, districtName);
    } else {
      console.log(`API 주소를 찾을 수 없습니다: ${districtName}`);
      return Promise.resolve();
    }
  });

  Promise.all(promises)
    .then(() => {
      // 데이터 배열 출력
      console.log('Data:', data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
fetchAllData()

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
function markerClickHandler(marker, name, address, phone) {
  if (currentOverlay) {
    currentOverlay.setMap(null); // 현재 표시된 오버레이 제거
  }

  var addressLink = 'https://map.kakao.com/link/search/' + encodeURIComponent(address);
  var content = '<div class="wrap">' +
    '    <div class="info">' +
    '        <div class="title">' +
    '            ' + name +
    '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
    '        </div>' +
    '        <div class="body">' +
    '            <div class="img">' +
    '                <img src="https://sitem.ssgcdn.com/38/27/24/item/1000472242738_i1_1100.jpg" width="73" height="70">' + // 이미지 샘플
    '           </div>' +
    '            <div class="desc">' +
    '                <div class="ellipsis">' + address + '</div>' +
    '                <div class="jibun ellipsis">' + phone + '</div>' +
    '                <div><a href="' + addressLink + '" target="_blank" class="link">도로명주소로 검색</a></div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>';
  
  const overlay = createOverlay(content, marker.getPosition());
  overlay.setMap(map); // 새 오버레이 지도에 표시
  currentOverlay = overlay; // 현재 오버레이 객체 저장
}

// 마커 추가 함수
function addMarkerByAddress(name, address, phone, coords) {
    const marker = new kakao.maps.Marker({
      position: coords,
      map: map
    });
    markers.push(marker);
  
    // 마커 클릭 이벤트 등록
    kakao.maps.event.addListener(marker, 'click', function() {
      markerClickHandler(marker, name, address, phone);
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


//지도 타입 컨트롤 추가
const mapTypeControl = new kakao.maps.MapTypeControl();


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
     // map.setCenter(coords);
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
        const distance = getDistance(latitude, longitude, item.coords.getLat(), item.coords.getLng());
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
  } else {
    // 테이블에 출력할 데이터 가져오기 (주소에 area 문자열이 포함된 데이터)
    const filteredData = data.filter(item => item.address.includes(area));
    const tableData = filteredData
    map.panTo(new kakao.maps.LatLng(tableData[0].coords.getLat(), tableData[0].coords.getLng()))
    // 데이터 출력
    displayData(tableData);
  }
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
      closeOverlay();
      map.setCenter(item.coords);
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

function showAlert() {
  alert("현재 지원하지 않는 지역입니다.");
}