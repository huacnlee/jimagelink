/*
 * jQuery jImageLink Plugin
 * Copyright (C) 2008 Wathon Team.
 *
 * 使用本插件请遵守《知识共享署名 2.5 中国大陆许可协议》
 * http://creativecommons.org/licenses/by/2.5/cn/
 *
 * @name jQuery.jImageLink: jQuery.jImageLink.js
 * @package jQuery jImageLink Plugin
 * @version 0.1 beta
 * @date January 26, 2008
 * @category jQuery plugin
 * @author Json Lee {@link http://huacn.cnblogs.com}
 * @copyright (c) 2008 Wathon Team. {@link http://www.wathon.com}
 * @license Attribution 2.5 China Mainland - {@link http://creativecommons.org/licenses/by/2.5/cn/}
 */
var jImageLink = {

	/**
	 * 本类自动创建的对象的ID名称前缀
	 */
	idPrefix: "jImageLink_control_",
	
	/**
	 * 参数设置
	 */
	settings: {		
		/**
		 * 小图标的样式
		 */
		iconClassName: "jImageLink_icon",
		
		/**
		 * 配合 Lightbox 这种类似的插件时需要用到的 rel 参数
		 */
		iconRel : "lightbox",
		
		/**
		 * 请传入小图标的 width
		 */
		iconWidth : 14,
		
		/**
		 * 请传入小图标的 height
		 */
		iconHeight : 14
	},
	
	/**
	 * 初始化
	 * @param {Object} el 要设置的对向数组
	 */
	init: function(el){

		$(el).each(function(){			
			
			var item = $(this);
			var img = $("img",item);
		
			
			/* 创建用于点击的span */
			var div = jImageLink.createDiv(img.get(0));		
			item.after(div);			
			
			/* 事件绑定 */
			div.mouseover(function(){
				var div = $(this).get(0);
				div.style.display = "";
			});
			
			item.mouseover(function(){		
				var div = $(this).next("div").get(0);			
				div.style.display = "inline";
			});
			
			item.mouseout(function(){
				var div = $(this).next("div").get(0);			
				div.style.display = "none";
			});

		});
	},
	
	/**
	 * 创建小图标的对象
	 * @param {Object} idName
	 */
	createDiv: function(image){
		var urlString = $(image).attr("alt");
		var imgTitle = $(image).attr("title");
		
		var div = document.createElement("div");
		
		
		div.style.position = "absolute";

		div.style.top = (image.offsetTop + (image.offsetHeight - jImageLink.settings.iconHeight - 5)) + "px";
		div.style.left = (image.offsetLeft + (image.offsetWidth - jImageLink.settings.iconWidth - 5)) + "px";
		
		
		//$(div).css("margin","-" + (jImageLink.settings.iconHeight + 5) + "px");

		
		div.style.display = "none";
		var link = document.createElement("a");
		link.className = jImageLink.settings.iconClassName;
		link.href = urlString;
		if (imgTitle != undefined) {
			link.title = imgTitle;
		}
		
		$(link).attr("rel",jImageLink.settings.iconRel);
		/* 点击连接的时候隐藏 */
		$(link).mouseup(function(){
			div.style.display = "none";
		});
		
		$(div).append(link);

		return $(div);
	}
	
	
};

/**
 * jQuery jImageLink Plugin
 * @param {Object} settings
 */
jQuery.fn.jImageLink = function(settings){

	$.extend(jImageLink.settings,settings);
	
	jImageLink.init($(this));
};