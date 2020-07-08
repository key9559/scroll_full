// 페이지 클릭시 변경

$('.pager').on('click', function () {
    var con_change = $(this).index();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.slide_content').removeClass('active');
    $('.slide_content' + con_change).addClass('active');
})

// 스크롤시 변경 : 스크롤 방향 상관없이 내려감, 범위가 +1까지

// $(window).on('mousewheel DOMMouseScroll',function(){
//     var find_ac=$('.page_btn.active').parent('.pager').index();
//     find_ac++;
//     if(find_ac==5){
//         find_ac==0;
//     }
//     scrollSlide(find_ac);
// })

// 스크롤시 변경 1. if문: 스크롤 방향 상관없이 내려감

// $(window).on('mousewheel DOMMouseScroll',function(){
//     var find_ac=$('.page_btn.active').parent('.pager').index();
//     find_ac++;
//     if(find_ac==5) {
//         scrollSlide(0);
//     } else{
//         scrollSlide(find_ac);
//     }
//     console.log(find_ac);
// })

// 스크롤시 변경 2.for문: 왜 0 다음이 4인가

// $(window).on('mousewheel DOMMouseScroll',function(){
//     for( i=0; i<=4; i++) {
//         scrollSlide(i);
//     }
// })

// 스크롤시 변경 3. 업, 다운시 방향 변경: 방향 바꾸면 첫번째는 바꾸기전 방향

// var scrollTop을 두개만들어 비교하는 방법으로 
// 외부에 만든 Top값(초기값)과 이벤트 이후에 나오는 Top값(변동)을 비교
// 스크롤 이전 Top값과 비교하여 스크롤방향 구분
// 코드정리

// var scrollTop = $(window).scrollTop(); // 초기값

// $(window).on('mousewheel DOMMouseScroll', function () {

//     var scrolling = $(window).scrollTop(); // 이벤트후 변동값
//     var find_ac = $('.pager.active').index();

//     console.log(scrollTop, scrolling);
//     if (scrollTop == scrolling) {

//         find_ac--;

//         if (find_ac == -1) {
//             scrollSlide(4);
//         } else {
//             scrollSlide(find_ac);
//         }

//     } else {

//         find_ac++;

//         if (find_ac == 5) {
//             scrollSlide(0);
//         } else {
//             scrollSlide(find_ac);
//         }

//     }

// })

// scroll move function

// function scroll_event(ac_class, change_number) {
//     $(ac_class).removeClass('active');
//     $(ac_class + change_number).addClass('active');
// }
// function scrollSlide(chan_num) {
//     scroll_event('.pager', chan_num);
//     scroll_event('.slide_content', chan_num);
// }

// teach 엄청왕초보

function setScrollSlide({ container, toActiveIndex }) {
    container.pageBtn.removeClass('active')
        .eq(toActiveIndex)
        .addClass('active');

    container.content.removeClass('active')
        .eq(toActiveIndex)
        .addClass('active');

}


$(document).ready(function (e) {
    const selector = {
        pageBtn: $('.pager'),
        content: $('.slide_content'),
        get active() {
            return this.content.parent().find('.active')
        },
    };
    const getScrollIdx = (to, activeIdx, maxLen) => {
        if (to) {
            return (--activeIdx) === -1 ? maxLen : activeIdx;
        }
        return (++activeIdx) === maxLen ? 0 : activeIdx;
    };
    const maxContentLength = selector.content.length;
    $(window).on('mousewheel', function (e) {
        const isScorllDown = e.originalEvent.wheelDelta >= 0;
        let activeIdx = selector.active.index();
        setScrollSlide(
            {
                container: selector,
                toActiveIndex: getScrollIdx(isScorllDown, activeIdx, maxContentLength)
            }
        )

    });
});
