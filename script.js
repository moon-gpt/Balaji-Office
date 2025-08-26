(function(){
    var script = {
 "layout": "absolute",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "vrPolyfillScale": 1,
 "children": [
  "this.MainViewer",
  "this.Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
  "this.Image_5B385ECA_4FF3_316F_41CB_B06BA8057F8A"
 ],
 "start": "this.init(); if(!this.get('fullscreenAvailable')) { [this.IconButton_C6C67945_D52B_D6F8_4198_4C9F7DC9F386].forEach(function(component) { component.set('visible', false); }) }",
 "borderSize": 0,
 "width": "100%",
 "horizontalAlign": "left",
 "defaultVRPointer": "laser",
 "scrollBarWidth": 10,
 "buttonToggleFullscreen": "this.IconButton_C6C67945_D52B_D6F8_4198_4C9F7DC9F386",
 "scripts": {
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "existsKey": function(key){  return key in window; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "registerKey": function(key, value){  window[key] = value; },
  "getKey": function(key){  return window[key]; }
 },
 "contentOpaque": false,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "borderRadius": 0,
 "downloadEnabled": false,
 "paddingRight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 20,
 "definitions": [{
 "hfovMax": 130,
 "hfov": 360,
 "label": "CPanorama_7",
 "id": "panorama_DFFF0922_D517_D6B8_41C2_B1335868E204",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -62.18,
   "distance": 1,
   "panorama": "this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73",
   "backwardYaw": 49.35
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_DB0EF1FE_D51E_598B_41C3_131F75DBF570",
  "this.overlay_DA065997_D51A_6999_41E4_CBA7CE41A14B"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.68,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F55FCBBE_E7BD_433E_41B7_68149B64745D",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -168.09,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4922C23_E7BD_44C6_41D7_0C124C093C02",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 149.74,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F482BC38_E7BD_44C4_41CB_3FDC4E31F101",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -145.81,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F42A5CCB_E7BD_4545_41E5_A822BF132278",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 132.17,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4FF0C60_E7BD_4542_41C4_9EE136FFB5E9",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation"
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "CPanorama_8",
 "id": "panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 139.33,
   "distance": 1,
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554",
   "backwardYaw": -100.2
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -17.58,
   "distance": 1,
   "panorama": "this.panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3",
   "backwardYaw": 34.19
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 71.32,
   "distance": 1,
   "panorama": "this.panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3",
   "backwardYaw": -52.36
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -13.59,
   "distance": 1,
   "panorama": "this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73",
   "backwardYaw": 138.58
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_DB0BA520_D51E_5EB8_41E3_2D7EC0A712AA",
  "this.overlay_DA37EF04_D516_6A7F_41E5_299E4B31BD3D",
  "this.overlay_DA39E8FA_D516_D78B_41D2_518419083D61",
  "this.overlay_C4E46DCA_D516_298B_41DE_0BF38EAADC16"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "displayMovements": [
  {
   "duration": 1000,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "linear"
  },
  {
   "duration": 3000,
   "class": "TargetRotationalCameraDisplayMovement",
   "easing": "cubic_in_out",
   "targetPitch": 0,
   "targetStereographicFactor": 0
  }
 ],
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "displayOriginPosition": {
  "class": "RotationalCameraDisplayPosition",
  "hfov": 165,
  "yaw": 0,
  "pitch": -90,
  "stereographicFactor": 1
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "AAPanorama_12",
 "id": "panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -47.83,
   "distance": 1,
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554",
   "backwardYaw": 57.52
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 33.62,
   "distance": 1,
   "panorama": "this.panorama_ECAB4FD9_E7A5_4342_41D6_558644496464",
   "backwardYaw": -43.15
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 11.91,
   "distance": 1,
   "panorama": "this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037",
   "backwardYaw": -4.89
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_EA2CAC56_E7AD_454E_41E2_D0F0BF7E5F27",
  "this.overlay_EA2C8C56_E7AD_454E_41DA_EC3844E0EB53",
  "this.overlay_EA2D7C56_E7AD_454E_41E2_F9B374E17FCA",
  "this.overlay_EA2D4C56_E7AD_454E_41EB_09C68FCA9B80"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.82,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4437D4C_E7BD_4743_41D3_86A203F6E7BF",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "AAPanorama_10",
 "id": "panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -100.2,
   "distance": 1,
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B",
   "backwardYaw": 139.33
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 57.52,
   "distance": 1,
   "panorama": "this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E",
   "backwardYaw": -47.83
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -30.26,
   "distance": 1,
   "panorama": "this.panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97",
   "backwardYaw": 42.83
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_EA82A0C7_E7A7_7D4E_41E9_9E9B3DF79E64",
  "this.overlay_EAB10D7B_E7A5_4745_41E9_5C6A608E452A",
  "this.overlay_EAB13D7B_E7A5_4745_41E5_3F4B36F40712",
  "this.overlay_EAB1DD7B_E7A5_4745_41DF_2A8D150B54F1"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -144.37,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4612D27_E7BD_44CE_41E4_15D0B0E2AF75",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 117.13,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4CB4C9A_E7BD_45C6_41D1_FE2C55BA3B83",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.41,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F450CD3A_E7BD_44C6_41C8_35E437D26BBF",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "AAPanorama_11",
 "id": "panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": 42.83,
   "distance": 1,
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554",
   "backwardYaw": -30.26
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_EAD16E1C_E7A3_44C2_4189_5583CC51BFAB",
  "this.overlay_EAD17E1C_E7A3_44C2_41D8_9CDCDAD440BC",
  "this.overlay_EAD12E1C_E7A3_44C2_41CC_53C2C9BA5147"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_camera"
  },
  {
   "media": "this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_camera"
  },
  {
   "media": "this.panorama_DFFF0922_D517_D6B8_41C2_B1335868E204",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_camera"
  },
  {
   "media": "this.panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_camera"
  },
  {
   "media": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_camera"
  },
  {
   "media": "this.panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_camera"
  },
  {
   "media": "this.panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_camera"
  },
  {
   "media": "this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_camera"
  },
  {
   "media": "this.panorama_ECAB4FD9_E7A5_4342_41D6_558644496464",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_camera"
  },
  {
   "media": "this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037",
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_camera"
  }
 ]
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "AAPanorama_14",
 "id": "panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "yaw": -4.89,
   "distance": 1,
   "panorama": "this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E",
   "backwardYaw": 11.91
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_EADF1A8C_E7AF_4DC2_41E1_07D274A7EA1A",
  "this.overlay_EADF0A8C_E7AF_4DC2_41E9_9E3A574E19B6"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.38,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F476FD14_E7BD_44C2_41E0_FC71C0DFBF3A",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 175.11,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4A3FC0D_E7BD_44C2_41E5_05B58ED768C0",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "CPanorama_9",
 "id": "panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -52.36,
   "distance": 1,
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B",
   "backwardYaw": 71.32
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_DB39C08E_D51E_3788_41D1_828FFA729F5D",
  "this.overlay_DAF62647_D516_7AF8_41D2_CA3926ED52C4"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "CPanorama_6",
 "id": "panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -62.87,
   "distance": 1,
   "panorama": "this.panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3",
   "backwardYaw": 35.63
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 138.58,
   "distance": 1,
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B",
   "backwardYaw": -13.59
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 49.35,
   "distance": 1,
   "panorama": "this.panorama_DFFF0922_D517_D6B8_41C2_B1335868E204",
   "backwardYaw": -62.18
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_DB01F0FA_D51E_F78B_41DF_1ED4D2D100A0",
  "this.overlay_DB63897F_D51A_5689_41CF_F2FCC57D5837",
  "this.overlay_DAD64DC4_D51A_29F8_41D2_3387C195342D",
  "this.overlay_DA64E2AF_D51A_3B89_41E7_7E6EFFC81621"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -40.67,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F48C9C4B_E7BD_4544_41D7_FA876B48C25E",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 162.42,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4D95C87_E7BD_45CE_416B_7F767219560D",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.64,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4144CE2_E7BD_4546_41E5_9D701CE6A890",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 79.8,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F43BDCB4_E7BD_45C3_41E9_C1642D59B1E6",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -137.17,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4E93C75_E7BD_4542_41C8_1AB8987E6E34",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "CPanorama_5",
 "id": "panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 34.19,
   "distance": 1,
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B",
   "backwardYaw": -17.58
  },
  {
   "class": "AdjacentPanorama",
   "yaw": 35.63,
   "distance": 1,
   "panorama": "this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73",
   "backwardYaw": -62.87
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_D8C2C240_D519_DAF7_41C2_E4745FB270B2",
  "this.overlay_D8EABDDA_D51E_2988_41C7_E212DA1D2DCE",
  "this.overlay_DAD2D696_D51A_7B9B_41E7_1A49FF0FF5E5"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -41.42,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4073CFB_E7BD_4546_41EA_49C56A26CBEA",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -130.65,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F551FBA2_E7BD_43C7_41B8_90FBE5205397",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "hfovMax": 130,
 "hfov": 360,
 "label": "AAPanorama_13",
 "id": "panorama_ECAB4FD9_E7A5_4342_41D6_558644496464",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B"
  },
  {
   "class": "AdjacentPanorama",
   "yaw": -43.15,
   "distance": 1,
   "panorama": "this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E",
   "backwardYaw": 33.62
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037"
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_EAD2489C_E7AC_CDC3_41E8_8C2DDC33619E",
  "this.overlay_EAD2589C_E7AC_CDC3_41E4_0CB37F16D4B2",
  "this.overlay_EAD2B89C_E7AC_CDC3_41EB_27A405A0E661"
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 3072,
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1536,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 136.85,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F4B12BF3_E7BD_4346_41EB_D8175D5D00B4",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_camera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -122.48,
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_F5448BD9_E7BD_4345_41E5_EFCAA1FB8997",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 }
},
{
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "id": "MainViewer",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 50,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "paddingRight": 0,
 "toolTipFontFamily": "Arial",
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 100,
 "playbackBarBackgroundOpacity": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "paddingLeft": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "borderSize": 0,
 "playbackBarOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorRatios": [
  0
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000",
 "class": "ViewerArea",
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowHorizontalLength": 0
},
{
 "layout": "absolute",
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "paddingLeft": 0,
 "id": "Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
  "this.IconButton_C6C67945_D52B_D6F8_4198_4C9F7DC9F386"
 ],
 "right": "0%",
 "borderSize": 0,
 "backgroundImageUrl": "skin/Container_AD0CA7F8_BA53_6FC4_4187_7494AA37F1CC.png",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": "12.832%",
 "paddingRight": 0,
 "propagateClick": true,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "class": "Container",
 "overflow": "visible",
 "data": {
  "name": "--- MENU"
 },
 "gap": 10,
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "paddingBottom": 0,
 "paddingLeft": 0,
 "id": "Image_5B385ECA_4FF3_316F_41CB_B06BA8057F8A",
 "left": "1.76%",
 "class": "Image",
 "width": "5.918%",
 "maxWidth": 1000,
 "borderSize": 0,
 "maxHeight": 1000,
 "url": "skin/Image_5B385ECA_4FF3_316F_41CB_B06BA8057F8A.png",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "top": "1.45%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": "10.622%",
 "paddingRight": 0,
 "propagateClick": false,
 "minWidth": 1,
 "click": "this.openLink('https://www.instagram.com/moon.gpt_/?utm_source=ig_web_button_share_sheet', '_blank')",
 "verticalAlign": "middle",
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image8960"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "cursor": "hand",
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "paddingLeft": 0,
 "id": "IconButton_C6C67945_D52B_D6F8_4198_4C9F7DC9F386",
 "toolTipShadowHorizontalLength": 0,
 "width": 71.2,
 "transparencyActive": true,
 "maxWidth": 128,
 "right": "0.8%",
 "borderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "maxHeight": 128,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "horizontalAlign": "center",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "toolTipShadowOpacity": 1,
 "bottom": "12.13%",
 "minHeight": 1,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipFontStyle": "normal",
 "mode": "toggle",
 "height": 49.7,
 "iconURL": "skin/IconButton_C6C67945_D52B_D6F8_4198_4C9F7DC9F386.png",
 "paddingRight": 0,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTip": "Fullscreen",
 "minWidth": 1,
 "toolTipShadowSpread": 0,
 "verticalAlign": "middle",
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipTextShadowColor": "#000000",
 "class": "IconButton",
 "data": {
  "name": "IconButton1493"
 },
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "toolTipPaddingBottom": 4,
 "shadow": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -105.41,
   "hfov": 12.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_1_HS_0_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.41
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_1_HS_0_0.png",
      "width": 277,
      "class": "ImageResourceLevel",
      "height": 195
     }
    ]
   },
   "pitch": 1.41,
   "yaw": -105.41
  }
 ],
 "id": "overlay_DB0EF1FE_D51E_598B_41C3_131F75DBF570",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.18,
   "hfov": 17.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -46.16
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.93,
   "image": "this.AnimatedImageResource_C68178D4_D52A_7798_4192_815655F8F898",
   "pitch": -46.16,
   "yaw": -62.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA065997_D51A_6999_41E4_CBA7CE41A14B",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73, this.camera_F551FBA2_E7BD_43C7_41B8_90FBE5205397); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 139.33,
   "hfov": 55.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_0_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 15.89
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 55.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_0_0.png",
      "width": 1307,
      "class": "ImageResourceLevel",
      "height": 614
     }
    ]
   },
   "pitch": 15.89,
   "yaw": 139.33
  }
 ],
 "id": "overlay_DB0BA520_D51E_5EB8_41E3_2D7EC0A712AA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554, this.camera_F43BDCB4_E7BD_45C3_41E9_C1642D59B1E6); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.59,
   "hfov": 15.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -60.64
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.25,
   "image": "this.AnimatedImageResource_C680F8D4_D52A_7798_41EA_9AE600F7D898",
   "pitch": -60.64,
   "yaw": -13.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA37EF04_D516_6A7F_41E5_299E4B31BD3D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73, this.camera_F4073CFB_E7BD_4546_41EA_49C56A26CBEA); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -17.58,
   "hfov": 14.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.66
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.04,
   "image": "this.AnimatedImageResource_C680A8D5_D52A_7798_41C0_F6C7265B9A3C",
   "pitch": -28.66,
   "yaw": -17.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA39E8FA_D516_D78B_41D2_518419083D61",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3, this.camera_F42A5CCB_E7BD_4545_41E5_A822BF132278); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.32,
   "hfov": 14.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_3_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.48
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.8,
   "image": "this.AnimatedImageResource_C68008D5_D52A_7798_41D3_823020168D9B",
   "pitch": -43.48,
   "yaw": 71.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_C4E46DCA_D516_298B_41DE_0BF38EAADC16",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3, this.camera_F4144CE2_E7BD_4546_41E5_9D701CE6A890); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.83,
   "hfov": 12.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.54
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.31,
   "image": "this.AnimatedImageResource_F7C08A6C_E7A7_CD43_41EB_926ED7A65644",
   "pitch": -24.54,
   "yaw": -47.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EA2CAC56_E7AD_454E_41E2_D0F0BF7E5F27",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554, this.camera_F5448BD9_E7BD_4345_41E5_EFCAA1FB8997); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.62,
   "hfov": 15.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.78
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.37,
   "image": "this.AnimatedImageResource_F7C0FA6D_E7A7_CD5D_41E3_BF9345158877",
   "pitch": -27.78,
   "yaw": 33.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EA2C8C56_E7AD_454E_41DA_EC3844E0EB53",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECAB4FD9_E7A5_4342_41D6_558644496464, this.camera_F4B12BF3_E7BD_4346_41EB_D8175D5D00B4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 11.91,
   "hfov": 17.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -16.34
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 01"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.66,
   "image": "this.AnimatedImageResource_F7C00A6D_E7A7_CD5D_41D1_F722869D8019",
   "pitch": -16.34,
   "yaw": 11.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EA2D7C56_E7AD_454E_41E2_F9B374E17FCA",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037, this.camera_F4A3FC0D_E7BD_44C2_41E5_05B58ED768C0); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -48.99,
   "hfov": 13.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.24
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.81,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_3_0.png",
      "width": 314,
      "class": "ImageResourceLevel",
      "height": 189
     }
    ]
   },
   "pitch": 2.24,
   "yaw": -48.99
  }
 ],
 "id": "overlay_EA2D4C56_E7AD_454E_41EB_09C68FCA9B80",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.2,
   "hfov": 24.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 16.8
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_0_0.png",
      "width": 576,
      "class": "ImageResourceLevel",
      "height": 545
     }
    ]
   },
   "pitch": 16.8,
   "yaw": -100.2
  }
 ],
 "id": "overlay_EA82A0C7_E7A7_7D4E_41E9_9E9B3DF79E64",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B, this.camera_F48C9C4B_E7BD_4544_41D7_FA876B48C25E); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 57.52,
   "hfov": 16.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -27.83
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.09,
   "image": "this.AnimatedImageResource_F7C50A68_E7A7_CD43_41C5_F78DAB492E07",
   "pitch": -27.83,
   "yaw": 57.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAB10D7B_E7A5_4745_41E9_5C6A608E452A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E, this.camera_F4FF0C60_E7BD_4542_41C4_9EE136FFB5E9); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.26,
   "hfov": 15.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.4
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.57,
   "image": "this.AnimatedImageResource_F7C55A69_E7A7_CD45_41B0_3327D6E5F390",
   "pitch": -24.4,
   "yaw": -30.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAB13D7B_E7A5_4745_41E5_3F4B36F40712",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97, this.camera_F4E93C75_E7BD_4542_41C8_1AB8987E6E34); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 24.51,
   "hfov": 14.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -6.15
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 01"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.75,
   "image": "this.AnimatedImageResource_F7C4EA69_E7A7_CD45_41BC_F6EB1787ED87",
   "pitch": -6.15,
   "yaw": 24.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAB1DD7B_E7A5_4745_41DF_2A8D150B54F1",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 42.83,
   "hfov": 15.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.22
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.22,
   "image": "this.AnimatedImageResource_F7C1CA6C_E7A7_CD43_41BE_B559A3EAEED9",
   "pitch": -25.22,
   "yaw": 42.83,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAD16E1C_E7A3_44C2_4189_5583CC51BFAB",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554, this.camera_F482BC38_E7BD_44C4_41CB_3FDC4E31F101); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -17.74,
   "hfov": 12.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -8.22
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 01"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.78,
   "image": "this.AnimatedImageResource_F7C13A6C_E7A7_CD43_41E6_1C793CF1EAE2",
   "pitch": -8.22,
   "yaw": -17.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAD17E1C_E7A3_44C2_41D8_9CDCDAD440BC",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 52.69,
   "hfov": 7.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   },
   "pitch": 3.02
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_1_HS_2_0.png",
      "width": 170,
      "class": "ImageResourceLevel",
      "height": 489
     }
    ]
   },
   "pitch": 3.02,
   "yaw": 52.69
  }
 ],
 "id": "overlay_EAD12E1C_E7A3_44C2_41CC_53C2C9BA5147",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -4.89,
   "hfov": 27.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.81
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Arrow 03a Left"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 27.59,
   "image": "this.AnimatedImageResource_F7C35A6F_E7A7_CD5D_41CE_CFB6D65673E4",
   "pitch": -44.81,
   "yaw": -4.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_EADF1A8C_E7AF_4DC2_41E1_07D274A7EA1A",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E, this.camera_F4922C23_E7BD_44C6_41D7_0C124C093C02); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -27.06,
   "hfov": 12.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_1_HS_1_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.08
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_1_HS_1_0.png",
      "width": 289,
      "class": "ImageResourceLevel",
      "height": 258
     }
    ]
   },
   "pitch": -0.08,
   "yaw": -27.06
  }
 ],
 "id": "overlay_EADF0A8C_E7AF_4DC2_41E9_9E3A574E19B6",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -69.31,
   "hfov": 10.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 19
     }
    ]
   },
   "pitch": 2.78
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_1_HS_0_0.png",
      "width": 233,
      "class": "ImageResourceLevel",
      "height": 289
     }
    ]
   },
   "pitch": 2.78,
   "yaw": -69.31
  }
 ],
 "id": "overlay_DB39C08E_D51E_3788_41D1_828FFA729F5D",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.36,
   "hfov": 20.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.13
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.75,
   "image": "this.AnimatedImageResource_C68388D5_D52A_7798_41E0_71230F2DA5D4",
   "pitch": -31.13,
   "yaw": -52.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DAF62647_D516_7AF8_41D2_CA3926ED52C4",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B, this.camera_F55FCBBE_E7BD_433E_41B7_68149B64745D); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.24,
   "hfov": 20.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.8
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.03,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_0_0.png",
      "width": 458,
      "class": "ImageResourceLevel",
      "height": 277
     }
    ]
   },
   "pitch": 5.8,
   "yaw": 133.24
  }
 ],
 "id": "overlay_DB01F0FA_D51E_F78B_41DF_1ED4D2D100A0",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -62.87,
   "hfov": 15.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -53.02
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.57,
   "image": "this.AnimatedImageResource_C6BEB8CE_D52A_7788_41B4_492CF67AF159",
   "pitch": -53.02,
   "yaw": -62.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DB63897F_D51A_5689_41CF_F2FCC57D5837",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3, this.camera_F4612D27_E7BD_44CE_41E4_15D0B0E2AF75); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.35,
   "hfov": 16.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -50.28
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.54,
   "image": "this.AnimatedImageResource_C6BE18CE_D52A_7788_41DE_BFFA9784C272",
   "pitch": -50.28,
   "yaw": 49.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DAD64DC4_D51A_29F8_41D2_3387C195342D",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFFF0922_D517_D6B8_41C2_B1335868E204, this.camera_F4437D4C_E7BD_4743_41D3_86A203F6E7BF); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 138.58,
   "hfov": 17.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_3_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.22
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.25,
   "image": "this.AnimatedImageResource_C681C8CE_D52A_7788_41C8_4F928C2675E4",
   "pitch": -48.22,
   "yaw": 138.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DA64E2AF_D51A_3B89_41E7_7E6EFFC81621",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B, this.camera_F450CD3A_E7BD_44C6_41C8_35E437D26BBF); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.86,
   "hfov": 12.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_1_HS_0_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.73
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_1_HS_0_0.png",
      "width": 277,
      "class": "ImageResourceLevel",
      "height": 195
     }
    ]
   },
   "pitch": 0.73,
   "yaw": 31.86
  }
 ],
 "id": "overlay_D8C2C240_D519_DAF7_41C2_E4745FB270B2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 35.63,
   "hfov": 13.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -57.83
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.78,
   "image": "this.AnimatedImageResource_C6BF48CD_D52A_7788_41D7_2574773BAD23",
   "pitch": -57.83,
   "yaw": 35.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D8EABDDA_D51E_2988_41C7_E212DA1D2DCE",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73, this.camera_F4CB4C9A_E7BD_45C6_41D1_FE2C55BA3B83); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.19,
   "hfov": 12.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.6
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.59,
   "image": "this.AnimatedImageResource_C6BF28CE_D52A_7788_41E3_4F415506786A",
   "pitch": -26.6,
   "yaw": 34.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_DAD2D696_D51A_7B9B_41E7_1A49FF0FF5E5",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B, this.camera_F4D95C87_E7BD_45CE_416B_7F767219560D); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -43.15,
   "hfov": 13.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.1
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.79,
   "image": "this.AnimatedImageResource_F7C39A6D_E7A7_CD5C_41E7_D6892731E59E",
   "pitch": -32.1,
   "yaw": -43.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAD2489C_E7AC_CDC3_41E8_8C2DDC33619E",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E, this.camera_F476FD14_E7BD_44C2_41E0_FC71C0DFBF3A); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -27.21,
   "hfov": 16.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -15.86
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Point 01"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.38,
   "image": "this.AnimatedImageResource_F7C3DA6E_E7A7_CD5F_41E2_E86EF496BF28",
   "pitch": -15.86,
   "yaw": -27.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_EAD2589C_E7AC_CDC3_41E4_0CB37F16D4B2",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.28,
   "hfov": 8.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   },
   "pitch": -0.44
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_1_HS_2_0.png",
      "width": 183,
      "class": "ImageResourceLevel",
      "height": 208
     }
    ]
   },
   "pitch": -0.44,
   "yaw": 12.28
  }
 ],
 "id": "overlay_EAD2B89C_E7AC_CDC3_41EB_27A405A0E661",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarMargin": 2,
 "paddingLeft": 30,
 "id": "Container_AD0DD7F8_BA53_6FC4_41DD_56889CF94F5F",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": 1199,
 "borderSize": 0,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "height": 51,
 "paddingRight": 0,
 "propagateClick": true,
 "minWidth": 1,
 "paddingTop": 0,
 "class": "Container",
 "overflow": "scroll",
 "data": {
  "name": "-button set container"
 },
 "scrollBarColor": "#000000",
 "verticalAlign": "middle",
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFFF0922_D517_D6B8_41C2_B1335868E204_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C68178D4_D52A_7798_4192_815655F8F898"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C680F8D4_D52A_7798_41EA_9AE600F7D898"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C680A8D5_D52A_7798_41C0_F6C7265B9A3C"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFF0BEE0_D516_2BB7_41E9_127EA4CF673B_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C68008D5_D52A_7798_41D3_823020168D9B"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C08A6C_E7A7_CD43_41EB_926ED7A65644"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C0FA6D_E7A7_CD5D_41E3_BF9345158877"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECA9762D_E7A5_44C2_41D0_34DDCC782C3E_1_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C00A6D_E7A7_CD5D_41D1_F722869D8019"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C50A68_E7A7_CD43_41C5_F78DAB492E07"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C55A69_E7A7_CD45_41B0_3327D6E5F390"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECF2C6A9_E7A5_C5C2_41D0_84EB437BD554_1_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C4EA69_E7A7_CD45_41BC_F6EB1787ED87"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C1CA6C_E7A7_CD43_41BE_B559A3EAEED9"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECA46C4B_E7A5_C545_41E0_3DCB4EB67B97_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C13A6C_E7A7_CD43_41E6_1C793CF1EAE2"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_E9168C8A_E7AF_C5C7_41C7_408F24D60037_1_HS_0_0.png",
   "width": 1220,
   "class": "ImageResourceLevel",
   "height": 1050
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C35A6F_E7A7_CD5D_41CE_CFB6D65673E4"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFFC35D8_D516_7988_41B1_4D9CD4E148A3_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C68388D5_D52A_7798_41E0_71230F2DA5D4"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C6BEB8CE_D52A_7788_41B4_492CF67AF159"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C6BE18CE_D52A_7788_41DE_BFFA9784C272"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_DFC8D423_D517_FEB9_41E0_FC95D2379B73_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C681C8CE_D52A_7788_41C8_4F928C2675E4"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C6BF48CD_D52A_7788_41D7_2574773BAD23"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_D94B67CA_D516_398B_41E0_B5B71C218AF3_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_C6BF28CE_D52A_7788_41E3_4F415506786A"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C39A6D_E7A7_CD5C_41E7_D6892731E59E"
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_ECAB4FD9_E7A5_4342_41D6_558644496464_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 1800
  }
 ],
 "rowCount": 6,
 "frameDuration": 41,
 "id": "AnimatedImageResource_F7C3DA6E_E7A7_CD5F_41E2_E86EF496BF28"
}],
 "mouseWheelEnabled": true,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "data": {
  "name": "Player460"
 },
 "desktopMipmappingEnabled": false,
 "gap": 10,
 "class": "Player",
 "verticalAlign": "top",
 "shadow": false,
 "scrollBarVisible": "rollOver"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
