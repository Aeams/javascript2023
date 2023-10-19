window.addEventListener("load", function() {
	var carousels = document.getElementsByClassName("carousel");

	//캐러셀 이벤트를 등록하는 로직
	for (var i = 0; i < carousels.length; i++) {
		addEventToCarousel(carousels[i])
	}

});

//이미지를 호출해서 가로길이를 측정
function addEventToCarousel(carouselElem) {
	var ulElem = carouselElem.querySelector("ul");
	var liElems = ulElem.querySelectorAll("li");

	//너비 값 조정
	//clientWidth는 요소의 내용 영역 너비를 나타내는 속성
	var liWidth = liElems[0].clientWidth; //600px
	var adjustedWidth = liElems.length * liWidth; //2400px
	ulElem.style.width = adjustedWidth;

	//슬라이드 버튼 이벤트 
	var slideButtons = carouselElem.querySelectorAll(".slide");
	//slide-left slide-rigth에 for문 사용하여 클릭 이벤트(createListenerSlide()호출)
	for (var i = 0; i < slideButtons.length; i++) {
		slideButtons[i].addEventListener("click", createListenerSlide(carouselElem)
		);
	}
}

// 이벤트가 발생하는 left/right에 따라 슬라이드 버튼이 작동되도록 구현하는 함수
function createListenerSlide(carouselElem) {
	return function(event) {
		// event.currentTarget는 현재 이벤트가 발생한 요소를 나타냄
		var clickedButton = event.currentTarget;

		// 값 가져오기
		var liElems = carouselElem.querySelectorAll("li");
		// li 이미지 갯수 저장
		var liCount = liElems.length;
		// <div class="carousel" data="0"> index값 0 가져오기
		var currentIndex = carouselElem.attributes.data.value;
		// 슬라이드 버튼 체크
		// liCount - 1 : 5개일 때 0~4이므로 인덱스 번호를 - 처리해서 3으로 끝냄
		// className.includes("right") :right라는 글자가 포함되어 있으면
		if (clickedButton.className.includes("right") &&
			currentIndex < liCount - 1) {
			currentIndex++;
			scrollDiv(carouselElem, currentIndex);
		} else if (clickedButton.className.includes("left") &&
			currentIndex > 0) {
			currentIndex--;
			scrollDiv(carouselElem, currentIndex);
		}

		//인디케이터 업데이트
		updateIndicator(carouselElem, currentIndex);

		//슬라이드 버튼 보여줌 여부 업데이트
		updateSlideButtonVisible(carouselElem, currentIndex, liCount);

		//새롭게 보여지는 이미지 인덱스 값을 현제 data 값으로 업데이트
		carouselElem.attributes.data.value = currentIndex;

	};
}


function scrollDiv(carouselElem, nextIndex) { // 외부 스크립트에서 따온 것
	var scrollable = carouselElem.querySelector("div");
	var liWidth = scrollable.clientWidth; //div안의 가로 넓이
	var newLeft = liWidth * nextIndex; //600*3=1800

	scrollable.scrollTo({ left: newLeft, behavior: "smooth" });
}

function updateIndicator(carouselElem, currentIndex) {
	var indicators = carouselElem.querySelectorAll("footer > div");
	for (var i = 0; i < indicators.length; i++) {
		if (currentIndex == i) {
			indicators[i].className = "active";
		} else {
			indicators[i].className = "";
		}
	}
}

function updateSlideButtonVisible(carouselElem, currentIndex, liCount) {
	var left = carouselElem.querySelector(".slide-left");
	var right = carouselElem.querySelector(".slide-right");

	if (currentIndex > 0) {
		left.style.display = "block";
	} else {
		left.style.display = "none";
	}

	if (currentIndex < liCount - 1) {
		right.style.display = "block";
	} else {
		right.style.display = "none";
	}
}

// window.addEventListner "load" : 페이지가 완전히 로드된 후에 함수를 실행하는 방법
// load 이벤트는 모든 리소스가(이미지, 스타일시트, 스크립트 등등) 로드된 시점에 작용