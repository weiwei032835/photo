
// part_search 上方搜尋按鈕 模組 =========
$(function () {
	$(".part_search .btn_open").on("click", function (e) {
		e.preventDefault();
		$("body").addClass("activeSearch");
		$(".part_search input[type=text]").focus();
	});
	$(".part_search input[type=text]").on("blur", function(){
		$("body").removeClass("activeSearch");
	});
});


// part_search_2 內頁搜尋按鈕 =========
$(function(){
	$(".part_search_2 input[type=text]").on("focus input blur", function(){
		if($(this).val() === ""){
			$(this).addClass("isBlank");
			$(".part_search_2 button[type=submit_2]").hide();
		}else{
			$(this).removeClass("isBlank");
			$(".part_search_2 button[type=submit_2]").show();
		}
	}).trigger("blur");
});


// goToTop 模組 =========
$(function () {
	let $win = $(window);
	let $body = $("html, body");
	let $goToTop = $(".goToTop");
	let iPointA = 600; //600出現
	$win.on("scroll", function () {
		requestAnimationFrame(() => {
			$win.scrollTop() > iPointA
				? $goToTop.addClass("active")
				: $goToTop.removeClass("active");
		});
	});

	$goToTop.on("click", function () {
		$body.animate({ scrollTop: 0 }, 1000);
	});
});

// onTop 固定版頭 模組 =========
$(function () {
	var iWinScrollTop = 0;
	$(window)
		.on("scroll", function () {
			iWinScrollTop = $(this).scrollTop() | 0;
			if (iWinScrollTop >= 50) {
				$(".header").addClass("onTop");
			} else {
				$(".header").removeClass("onTop");
			}
		})
		.trigger("scroll");
});

// 新聞內頁 分享按鈕 模組 =========
$(function () {
	var iPoint = 500;
	var iWinScrollT;
	var oScrollTimer = null;
	$(window).on("scroll", function () {
		if ($("body.news-page").length > 0) {
			//新聞內頁
			if (oScrollTimer) {
				clearTimeout(oScrollTimer);
			}
			oScrollTimer = setTimeout(function () {
				iWinScrollT = $(window).scrollTop();
				if (iWinScrollT > iPoint) {
					$("#et_sticky_pc").css({ height: "500px" });
				} else {
					$("#et_sticky_pc").css({ height: "0px" });
				}
			}, 100);
		}
	});

	//拷貝連結
	$(".link").click(function(){
		alert("連結已複製！")
		var $temp = $("<input>"); //暫放網址用
		$("body").append($temp);
		$temp.val(window.location.href).select();
		document.execCommand("copy");
		$temp.remove(); //移除
	});

	//修正 新聞內文 段落 圖說 margin =================
	$(function () {
		$(".subject_article .story p strong").each(function () {
			var $strong = $(this);
			var $p = $strong.parent("p");
			var sTxt = $strong.text();

			switch (true) {
				//strong 圖說在中間
				case Boolean(sTxt.match(/^▲▼/g)): //正規式 match 輸出陣列需要轉布林
					$p.prev("p").addClass("no_margin");
					$p.addClass("no_margin");
					break;

				//strong 圖說在下
				case Boolean(sTxt.match(/^▲/g)):
					$p.prev("p").addClass("no_margin");
					break;

				//strong 圖說在上
				case Boolean(sTxt.match(/^▼/g)):
					$p.addClass("no_margin");
					break;

				default:
				// console.log("圖說無動作");
			}

			//strong 圖說加樣式
			if (sTxt.match(/▼|▲/g)) {
				$strong.addClass("figcaption");
			}
		});
	});

	//文中廣告，若有內容，顯示"請繼續往下閱讀"的文字 & 優化圖說與文中廣告的位置(if廣告插在圖片&圖說中間，移動圖片)
	$(function () {
		setTimeout(function () {
			$(".ad_in_news").each(function () {
				if (
					$(this).find("ins").length ||
					$(this).find("img").length ||
					$(this).find("iframe").length
				) {
					//ins:google聯播網，img:其他聯播網
					$(this).find(".ad_readmore").css({ display: "block" });

					//圖說優化 開始============
					switch (true) {
						//廣告後有：圖說+圖片
						case Boolean($(this).next("p").find("strong").text().match(/^▲▼/g)):
							$(this).prev("p").addClass("no_margin");
							$(this).next("p").insertBefore($(this)); //圖說往上搬
							$(this).next("p").insertBefore($(this)); //圖片往上搬
							break;

						//廣告後有：圖片
						case Boolean($(this).prev("p").find("strong").text().match(/^▲▼/g)):
							$(this).next("p").insertBefore($(this)); //圖片往上搬
							break;

						//廣告後有：圖說
						case Boolean(
							$(this)
								.next("p")
								.find("strong")
								.text()
								.match(/^▲(?!▼)/g)
						):
							$(this).prev("p").addClass("no_margin");
							$(this).next("p").insertBefore($(this)); //圖說往上搬
							break;

						default:
							break;
					}
					//圖說優化 結束============
				}
			});
		}, 2000);
	});
});

