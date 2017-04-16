var session = new IFlyIatSession({
                                      'url' : 'http://webapi.openspeech.cn/',							
                                      'reconnection'       : true,
									  'reconnectionDelay'  : 30000,
									  'compress' : 'speex',
									  'speex_path' : '../js/common/speex.js',              //speex.js±¾µØÂ·¾¶ 
									  'vad_path' : '../js/common/vad.js',                  //vad.js±¾µØÂ·¾¶
									  'recorder_path' : '../js/audio/recorderWorker.js'    //recordWorker.js±¾µØÂ·¾¶
						         });
		
		/**
		  * ¿ªÆôÂ¼Òô²¢»ñÈ¡Ê¶±ð½á¹û
		  */
		function start() {
		    /***********************************************************ÒÔÏÂÇ©Ãû¹ý³ÌÐè¸ù¾ÝÊµ¼ÊÓ¦ÓÃÐÅÏ¢ÌîÈë***************************************************/
		 
		    var appid = $(appid);                              //Ó¦ÓÃAPPID£¬ÔÚopen.voicecloud.cnÉÏÉêÇë¼´¿É»ñµÃ
		    var timestamp = $(timestamp);                      //µ±Ç°Ê±¼ä´Á£¬Àýnew Date().toLocaleTimeString()
            var expires = $(expires);                          //Ç©ÃûÊ§Ð§Ê±¼ä£¬µ¥Î»:ms£¬Àý60000		
		    //!!!Îª±ÜÃâsecretkeyÐ¹Â¶£¬Ç©Ãûº¯Êýµ÷ÓÃ´úÂë½¨ÒéÔÚ·þÎñÆ÷ÉÏÍê³É
		    var signature = faultylabs.MD5(appid + '&' + timestamp + '&' + expires + '&' + secret_key);	
		   /************************************************************ÒÔÉÏÇ©Ãû¹ý³ÌÐè¸ù¾ÝÊµ¼ÊÓ¦ÓÃÐÅÏ¢ÌîÈë**************************************************/
		    var params = {"grammar_list" : null, "params" : "aue=speex-wb;-1, usr = mkchen, ssm = 1, sub = iat, net_type = wifi, ent =sms16k, rst = plain, auf  = audio/L16;rate=16000, vad_enable = 1, vad_timeout = 5000, vad_speech_tail = 500, caller.appid = " + appid + ",timestamp = " + timestamp + ",expires = " + expires, "signature" : signature};
			
            /* µ÷ÓÃ¿ªÊ¼Â¼Òô½Ó¿Ú£¬Í¨¹ýfunction(volume)ºÍfunction(err, obj)»Øµ÷ÒôÁ¿ºÍÊ¶±ð½á¹û */
		    session.start(params, function (volume)
		    {	
                /* »ñÈ¡²¢Õ¹Ê¾µ±Ç°Â¼ÒôÒôÁ¿ */			
			    if(volume < 6 && volume > 0)
				    console.log("volume : " + volume);
					
			    /* Èôvolume·µ»Ø¸ºÖµ£¬ËµÃ÷Âó¿Ë·çÆô¶¯Ê§°Ü*/
			    if(volume < 0)
				    console.log("Âó¿Ë·çÆô¶¯Ê§°Ü");
		    }, function (err, result)
		    {
			    /* Èô»Øµ÷µÄerrÎª¿Õ»ò´íÎóÂëÎª0£¬Ôò»á»°³É¹¦£¬¿ÉÌáÈ¡Ê¶±ð½á¹û½øÐÐÏÔÊ¾*/
		        if(err == null || err == undefined || err == 0)
			    {
				    if(result == '' || result == null)
					    document.getElementById('result').innerHTML = "Ã»ÓÐ»ñÈ¡µ½Ê¶±ð½á¹û";
				    else
					    document.getElementById('result').innerHTML = result;
			    /* Èô»Øµ÷µÄerr²»Îª¿ÕÇÒ´íÎóÂë²»Îª0£¬Ôò»á»°Ê§°Ü£¬¿ÉÌáÈ¡´íÎóÂë */	
			    } else
			    {
			        document.getElementById('result').innerHTML = 'error code : ' + err + ", error description : " + result;
			    }
		    }, function(message)
			{
				if(message == 'onStop')
				{
					console.log("Â¼ÒôÍ£Ö¹");
				} else if(message == 'onEnd')
				{
					console.log("»á»°½áÊø");
				}
			}, function(data)
			{
				console.log(data);
			});			
			
		};
		
		function stop() {
			session.stop(null);
		};