webshims.register("forms-picker",function(e,t,i,n,a,r){"use strict";var o=t.picker,s=o._actions,l=r,u=function(e){var t=[e.getFullYear(),l.addZero(e.getMonth()+1),l.addZero(e.getDate())];return t.month=t[0]+"-"+t[1],t.date=t[0]+"-"+t[1]+"-"+t[2],t.time=e.getHours()+":"+e.getMinutes(),t["datetime-local"]=t.date+"T"+t.time,t},c=u(new Date),d=function(t){t=e(t||this.activeButton),this.activeButton.attr({tabindex:"-1","aria-selected":"false"}),this.activeButton=t.attr({tabindex:"0","aria-selected":"true"}),this.index=this.buttons.index(this.activeButton[0]),clearTimeout(this.timer),o._genericSetFocus.apply(this,arguments)},p=function(){var t;this.popover.navedInitFocus&&(t=this.popover.navedInitFocus.sel||this.popover.navedInitFocus,this.activeButton&&this.activeButton[0]||!this.buttons[t]?t&&(this.activeButton=e(t,this.element)):this.activeButton=this.buttons[t](),!this.activeButton[0]&&this.popover.navedInitFocus.alt&&(this.activeButton=this.buttons[this.popover.navedInitFocus.alt]())),this.activeButton&&this.activeButton[0]||(this.activeButton=this.buttons.filter(".checked-value")),this.activeButton[0]||(this.activeButton=this.buttons.filter(".this-value")),this.activeButton[0]||(this.activeButton=this.buttons.eq(0)),this.setFocus(this.activeButton,this.opts.noFocus)},f=t.formcfg,h=f[e.webshims.activeLang()]||f[""];e.webshims.activeLang({register:"form-core",callback:function(){e.each(arguments,function(e,t){return f[t]?(h=f[t],!1):a})}}),t.ListBox=function(t,i,n){this.element=e("ul",t),this.popover=i,this.opts=n||{},this.buttons=e("button:not(:disabled)",this.element),this.ons(this),this._initialFocus()},t.ListBox.prototype={setFocus:d,_initialFocus:p,prev:function(){var e=this.index-1;0>e?this.opts.prev&&(this.popover.navedInitFocus="last",this.popover.actionFn(this.opts.prev),this.popover.navedInitFocus=!1):this.setFocus(this.buttons.eq(e))},next:function(){var e=this.index+1;e>=this.buttons.length?this.opts.next&&(this.popover.navedInitFocus="first",this.popover.actionFn(this.opts.next),this.popover.navedInitFocus=!1):this.setFocus(this.buttons.eq(e))},ons:function(e){this.element.on({keydown:function(t){var i,n=t.keyCode;return t.ctrlKey?a:(36==n||33==n?(e.setFocus(e.buttons.eq(0)),i=!0):34==n||35==n?(e.setFocus(e.buttons.eq(e.buttons.length-1)),i=!0):38==n||37==n?(e.prev(),i=!0):(40==n||39==n)&&(e.next(),i=!0),i?!1:a)}})}},t.Grid=function(t,i,n){this.element=e("tbody",t),this.popover=i,this.opts=n||{},this.buttons=e("button:not(:disabled,.othermonth)",this.element),this.ons(this),this._initialFocus(),this.popover.openedByFocus&&(this.popover.activeElement=this.activeButton)},t.Grid.prototype={setFocus:d,_initialFocus:p,first:function(){this.setFocus(this.buttons.eq(0))},last:function(){this.setFocus(this.buttons.eq(this.buttons.length-1))},upPage:function(){e(".ws-picker-header > button:not(:disabled)",this.popover.element).trigger("click")},downPage:function(){this.activeButton.filter(':not([data-action="changeInput"])').trigger("click")},ons:function(e){this.element.on({keydown:function(t){var i,n=t.keyCode;return t.shiftKey?a:(t.ctrlKey&&40==n?i="downPage":t.ctrlKey&&38==n?i="upPage":33==n||t.ctrlKey&&37==n?i="prevPage":34==n||t.ctrlKey&&39==n?i="nextPage":36==t.keyCode||33==t.keyCode?i="first":35==t.keyCode?i="last":38==t.keyCode?i="up":37==t.keyCode?i="prev":40==t.keyCode?i="down":39==t.keyCode&&(i="next"),i?(e[i](),!1):a)}})}},e.each({prevPage:{get:"last",action:"prev"},nextPage:{get:"first",action:"next"}},function(e,i){t.Grid.prototype[e]=function(){this.opts[i.action]&&(this.popover.navedInitFocus={sel:'button[data-id="'+this.activeButton.attr("data-id")+'"]:not(:disabled,.othermonth)',alt:i.get},this.popover.actionFn(this.opts[i.action]),this.popover.navedInitFocus=!1)}}),e.each({up:{traverse:"prevAll",get:"last",action:"prev",reverse:!0},down:{traverse:"nextAll",get:"first",action:"next"}},function(i,n){t.Grid.prototype[i]=function(){var t=this.activeButton.closest("td").prop("cellIndex"),i="td:nth-child("+(t+1)+") button:not(:disabled,.othermonth)",a=this.activeButton.closest("tr")[n.traverse]();n.reverse&&(a=e(a.get().reverse())),a=a.find(i)[n.get](),a[0]?this.setFocus(a.eq(0)):this.opts[n.action]&&(this.popover.navedInitFocus=i+":"+n.get,this.popover.actionFn(this.opts[n.action]),this.popover.navedInitFocus=!1)}}),e.each({prev:{traverse:"prevAll",get:"last",reverse:!0},next:{traverse:"nextAll",get:"first"}},function(i,n){t.Grid.prototype[i]=function(){var t="button:not(:disabled,.othermonth)",a=this.activeButton.closest("td")[n.traverse]("td");n.reverse&&(a=e(a.get().reverse())),a=a.find(t)[n.get](),a[0]||(a=this.activeButton.closest("tr")[n.traverse]("tr"),n.reverse&&(a=e(a.get().reverse())),a=a.find(t)[n.get]()),a[0]?this.setFocus(a.eq(0)):this.opts[i]&&(this.popover.navedInitFocus=n.get,this.popover.actionFn(this.opts[i]),this.popover.navedInitFocus=!1)}}),o.getWeek=function(e){var t,i=new Date(e.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},o.getYearList=function(e,t){var i,n,a,r,s,l,u,d,p,f,h=t.options,m=h.size,v=h.max.split("-"),g=h.min.split("-"),y=h.cols||4,b=h.value.split("-"),w=0,T=0,x="",E=0;for("max"==t.options.useDecadeBase&&v[0]?w=11-v[0]%12:"min"==t.options.useDecadeBase&&g[0]&&(w=11-g[0]%12),e=1*e[0],f=e-(e+w)%(12*m),i=0;m>i;i++){for(i?f+=12:l=o.isInRange([f-1],v,g)?{"data-action":"setYearList",value:f-1}:!1,x+='<div class="year-list picker-list ws-index-'+i+'"><div class="ws-picker-header"><button disabled="disabled">'+f+" \u2013 "+(f+11)+"</button></div>",s=[],n=0;12>n;n++)a=f+n,p=[],o.isInRange([a],v,g)?(r="",T++):r=' disabled=""',a==c[0]&&p.push("this-value"),b[0]==a&&p.push("checked-value"),d=p.length?' class="'+p.join(" ")+'"':"",!n||n%y||(E++,s.push('</tr><tr class="ws-row-'+E+'">')),s.push('<td class="ws-item-'+n+'" role="presentation"><button  data-id="year-'+n+'" type="button"'+r+d+' data-action="setMonthList" value="'+a+'" tabindex="-1" role="gridcell">'+a+"</button></td>");i==m-1&&(u=o.isInRange([a+1],v,g)?{"data-action":"setYearList",value:a+1}:!1),x+='<div class="picker-grid"><table role="grid" aria-label="'+f+" \u2013 "+(f+11)+'"><tbody><tr class="ws-row-0">'+s.join("")+"</tr></tbody></table></div></div>"}return{enabled:T,main:x,next:u,prev:l,type:"Grid"}},o.getMonthList=function(e,t){var i,n,a,r,s,l,u,d,p,f,m,v=t.options,g=v.size,y=v.max.split("-"),b=v.min.split("-"),w=v.cols||4,T=v.value.split("-"),x=0,E=0,N="";for(e=e[0]-Math.floor((g-1)/2),i=0;g>i;i++){for(i?e++:d=o.isInRange([e-1],y,b)?{"data-action":"setMonthList",value:e-1}:!1,i==g-1&&(p=o.isInRange([e+1],y,b)?{"data-action":"setMonthList",value:e+1}:!1),l=[],o.isInRange([e,"01"],y,b)||o.isInRange([e,"12"],y,b)?(u=!1,s=""):(s=' disabled=""',u=!0),v.minView>=1&&(s=' disabled=""'),N+='<div class="month-list picker-list ws-index-'+i+'"><div class="ws-picker-header">',N+=v.selectNav?'<select data-action="setMonthList" class="year-select">'+o.createYearSelect(e,y,b).join("")+"</select>":'<button data-action="setYearList"'+s+' value="'+e+'" tabindex="-1">'+e+"</button>",N+="</div>",n=0;12>n;n++)r=h.date.monthkeys[n+1],a=(h.date[v.monthNames]||h.date.monthNames)[n],m=[],u||!o.isInRange([e,r],y,b)?s=' disabled=""':(s="",x++),e==c[0]&&c[1]==r&&m.push("this-value"),T[0]==e&&T[1]==r&&m.push("checked-value"),f=m.length?' class="'+m.join(" ")+'"':"",!n||n%w||(E++,l.push('</tr><tr class="ws-row-'+E+'">')),l.push('<td class="ws-item-'+n+'" role="presentation"><button data-id="month-'+n+'" type="button"'+s+f+' data-action="'+("month"==t.type?"changeInput":"setDayList")+'" value="'+e+"-"+r+'" tabindex="-1" role="gridcell" aria-label="'+h.date.monthNames[n]+'">'+a+"</button></td>");N+='<div class="picker-grid"><table role="grid" aria-label="'+e+'"><tbody><tr class="ws-row-0">'+l.join("")+"</tr></tbody></table></div></div>"}return{enabled:x,main:N,prev:d,next:p,type:"Grid"}},o.getDayList=function(t,i){var n,a,r,s,l,d,p,f,m,v,g,y,b,w,T,x,E,N,A,k,C,S=i.options,M=S.size,D=S.max.split("-"),_=S.min.split("-"),P=S.value.split("-"),O=h.date[S.monthNamesHead]||h.date[S.monthNames]||h.date.monthNames,F=[],I=new Date(t[0],t[1]-1,1),j="datetime-local"==i.type?"setTimeList":"changeInput";for(I.setMonth(I.getMonth()-Math.floor((M-1)/2)),S.yearButtons&&(f=[1*t[0]+1,t[1]],f=o.isInRange(f,D,_)?{"data-action":"setDayList",value:f.join("-")}:!1,m=[1*t[0]-1,t[1]],m=o.isInRange(m,D,_)?{"data-action":"setDayList",value:m.join("-")}:!1),n=0;M>n;n++){for(I.setDate(1),b=I.getMonth(),y=0,n||(k=new Date(I.getTime()),k.setDate(-1),x=u(k),d=o.isInRange(x,D,_)?{"data-action":"setDayList",value:x[0]+"-"+x[1]}:!1),x=u(I),F.push('<div class="day-list picker-list ws-index-'+n+'"><div class="ws-picker-header">'),S.selectNav&&(E=['<select data-action="setDayList" class="month-select" tabindex="0">'+o.createMonthSelect(x,D,_,O).join("")+"</select>",'<select data-action="setDayList" class="year-select" tabindex="0">'+o.createYearSelect(x[0],D,_,"-"+x[1]).join("")+"</select>"],h.date.showMonthAfterYear&&E.reverse(),F.push(E.join(" "))),N=[h.date.monthNames[1*x[1]-1],x[0]],E=[O[1*x[1]-1],x[0]],h.date.showMonthAfterYear&&(E.reverse(),N.reverse()),i.options.selectNav||F.push('<button data-action="setMonthList"'+(S.minView>=2?' disabled="" ':"")+' value="'+x.date+'" tabindex="-1">'+E.join(" ")+"</button>"),F.push('</div><div class="picker-grid"><table role="grid" aria-label="'+N.join(" ")+'"><thead><tr>'),i.options.showWeek&&F.push('<th class="week-header">'+h.date.weekHeader+"</th>"),r=h.date.firstDay;h.date.dayNamesShort.length>r;r++)F.push('<th class="day-'+r+'"><abbr title="'+h.date.dayNames[r]+'">'+h.date.dayNamesShort[r]+"</abbr></th>");for(r=h.date.firstDay;r--;)F.push('<th class="day-'+r+'"><abbr title="'+h.date.dayNames[r]+'">'+h.date.dayNamesShort[r]+"</abbr></th>");for(F.push('</tr></thead><tbody><tr class="ws-row-0">'),i.options.showWeek&&(g=o.getWeek(I),F.push('<td class="week-cell">'+g+"</td>")),a=0;99>a;a++){if(v=a&&!(a%7),w=I.getMonth(),T=b!=w,s=I.getDay(),C=[],v&&T){F.push("</tr>");break}v&&(y++,F.push('</tr><tr class="ws-row-'+y+'">'),i.options.showWeek&&(g++,g>52&&(g=o.getWeek(I)),F.push('<td class="week-cell">'+g+"</td>"))),a||s!=h.date.firstDay&&(l=s-h.date.firstDay,0>l&&(l+=7),I.setDate(I.getDate()-l),s=I.getDay(),w=I.getMonth(),T=b!=w),x=u(I),A='<td role="presentation" class="day-'+s+'"><button data-id="day-'+I.getDate()+'" role="gridcell" data-action="'+j+'" value="'+x.join("-")+'" type="button"',T?C.push("othermonth"):C.push("day-"+I.getDate()),x[0]==c[0]&&c[1]==x[1]&&c[2]==x[2]&&C.push("this-value"),P[0]==x[0]&&x[1]==P[1]&&x[2]==P[2]&&C.push("checked-value"),C.length&&(A+=' class="'+C.join(" ")+'"'),(!o.isInRange(x,D,_)||i.options.disableDays&&-1!=e.inArray(s,i.options.disableDays))&&(A+=' disabled=""'),F.push(A+' tabindex="-1">'+I.getDate()+"</button></td>"),I.setDate(I.getDate()+1)}F.push("</tbody></table></div></div>"),n==M-1&&(x=u(I),x[2]=1,p=o.isInRange(x,D,_)?{"data-action":"setDayList",value:x.date}:!1)}return{enabled:9,main:F.join(""),prev:d,next:p,yearPrev:m,yearNext:f,type:"Grid"}},o.getTimeList=function(t,i){var n,a,r,o,s,u='<div class="time-list picker-list ws-index-0">',c=0,d=0,p=23,f={min:e.prop(i.orig,"min"),max:e.prop(i.orig,"max"),step:e.prop(i.orig,"step")},m=i.options,v=h.date[m.monthNamesHead]||h.date[m.monthNames]||h.date.monthNames,g="";for("time"==i.type?n='<button type="button" disabled="">'+e.trim(e(i.orig).jProp("labels").text()||"").replace(/[\:\*]/g,"")+"</button>":(a=t[2].split("T"),t[2]=a[0],a[1]&&(t[3]=a[1]),n=t[2]+". "+v[1*t[1]-1]+" "+t[0],g=' aria-label="'+n+'"',n='<button tabindex="-1" data-action="setDayList" value="'+t[0]+"-"+t[1]+"-"+t[2]+'" type="button">'+n+"</button>",s=t[0]+"-"+t[1]+"-"+t[2]+"T"),u+='<div class="ws-picker-header">'+n+"</div>",u+='<div class="picker-grid"><table role="grid"'+g+"><tbody><tr>";p>=c;c++)r=l.addZero(""+c)+":00",o=s?s+r:r,!c||c%4||(d++,u+='</tr><tr class="ws-row-'+d+'">'),u+='<td role="presentation"><button role="gridcell" data-action="changeInput" value="'+o+'" type="button" tabindex="-1"',i.isValid(o,f)||(u+=' disabled=""'),t==r&&(u+=' class="checked-value"'),u+=">"+i.formatValue(r)+"</button></td>";return u+="</tr></tbody></table></div></div>",{enabled:9,main:u,prev:!1,next:!1,type:"Grid"}},o.isInRange=function(e,t,i){var n,a=!0;for(n=0;e.length>n;n++){if(i[n]&&i[n]>e[n]){a=!1;break}if(!i[n]||i[n]!=e[n])break}if(a)for(n=0;e.length>n;n++){if(t[n]&&t[n]<e[n]){a=!1;break}if(!t[n]||t[n]!=e[n])break}return a},o.createMonthSelect=function(e,t,i,n){n||(n=h.date.monthNames);for(var a,r=0,s=[],u=e[1]-1;n.length>r;r++)a=u==r?' selected=""':"",(a||o.isInRange([e[0],r+1],t,i))&&s.push('<option value="'+e[0]+"-"+l.addZero(r+1)+'"'+a+">"+n[r]+"</option>");return s},o.createYearSelect=function(e,t,i,n){var a,r=!0,s=!0,l=['<option selected="">'+e+"</option>"],u=0;for(n||(n="");8>u&&(r||s);)u++,a=e-u,r&&o.isInRange([a],t,i)?l.unshift('<option value="'+(a+n)+'">'+a+"</option>"):r=!1,a=e+u,s&&o.isInRange([a],t,i)?l.push('<option value="'+(a+n)+'">'+a+"</option>"):s=!1;return l},function(){var i=function(e){return"get"+e+"List"},n=function(e){return"set"+e+"List"},a={date:"Day",week:"Day",month:"Month","datetime-local":"Time",time:"Time"},r=function(e,t,i){e[i]?t[i+"Element"].attr(e[i]).prop({disabled:!1}):t[i+"Element"].removeAttr("data-action").prop({disabled:!0})};e.each({setYearList:["Year","Month","Day","Time"],setMonthList:["Month","Day","Time"],setDayList:["Day","Time"],setTimeList:["Time"]},function(l,u){var c=u.map(i),d=u.map(n);s[l]=function(i,n,s,l){i=""+i;var p=s.options,f=i.split("-");l||(l=0),e.each(c,function(e,i){if(e>=l){var c=o[i](f,s);if(2>f.length||c.enabled>1||a[s.type]===u[e])return n.element.attr({"data-currentview":d[e]}).addClass("ws-size-"+p.size).data("pickercontent",{data:s,content:c,values:f}),n.bodyElement.html(c.main),r(c,n,"prev"),r(c,n,"next"),p.yearButtons&&(r(c,n,"yearPrev"),r(c,n,"yearNext")),t[c.type]&&new t[c.type](n.bodyElement.children(),n,c),n.element.trigger("pickerchange").filter('[data-vertical="bottom"]').triggerHandler("pospopover"),!1}})}})}(),o.showPickerContent=function(e,t){var i=e.options;e._popoverinit||(o.commonInit(e,t),o.commonDateInit(e,t)),!e._popoverinit||i.restartView?s.setYearList(i.defValue||i.value,t,e,i.startView):s[t.element.attr("data-currentview")||"setYearList"](i.defValue||i.value,t,e,0),e._popoverinit=!0},o.commonDateInit=function(i,a){var r=function(){return e(this).is(".othermonth")&&"pointer"!=e(this).css("cursor")||a.actionFn({"data-action":e.attr(this,"data-action"),value:e(this).val()||e.attr(this,"value")}),!1},l=(new Date).getTime(),u=function(n){var r=[],s="",u="";n.options=i.getOptions()||{},e("div.ws-options",a.contentElement).remove(),e.each(n.options[0],function(e,t){var a=o.isInRange(e.split("-"),n.maxS,n.minS)?"":' disabled="" ';r.push('<li role="presentation"><button value="'+e+'" '+a+' data-action="changeInput" tabindex="-1"  role="option">'+(t||i.formatValue(e,!1))+"</button></li>")}),r.length&&(l++,n.options[1]&&(u="datalist-"+l,s='<h5 id="'+u+'">'+n.options[1]+"</h5>",u=' aria-labelledbyid="'+u+'" '),new t.ListBox(e('<div class="ws-options">'+s+'<ul role="listbox" '+u+">"+r.join("")+"</div>").insertAfter(a.bodyElement)[0],a,{noFocus:!0}))},d=function(){if(a.isDirty){var n=i.options;n.maxS=n.max.split("-"),n.minS=n.min.split("-"),e("button",a.buttonRow).each(function(){var a;e(this).is(".ws-empty")?(a=h.date.clear,a||(a=f[""].date.clear||"clear",t.warn("could not get clear text from form cfg"))):e(this).is(".ws-current")&&(a=(h[i.type]||{}).currentText,a||(a=(f[""][[i.type]]||{}).currentText||(h.date||{}).currentText||"current",t.warn("could not get currentText from form cfg for "+i.type)),c[i.type]&&"time"!=i.type&&e.prop(this,"disabled",!o.isInRange(c[i.type].split("-"),n.maxS,n.minS))),a&&(e(this).text(a).attr({"aria-label":a}),t.assumeARIA&&e.attr(this,"aria-label",a))}),a.nextElement.attr({"aria-label":h.date.nextText}).find("span").html(h.date.nextText),a.prevElement.attr({"aria-label":h.date.prevText}).find("span").html(h.date.prevText),n.yearButtons&&(a.yearNextElement.attr({"aria-label":h.date.nextText}).find("span").html(h.date.nextText),a.yearPrevElement.attr({"aria-label":h.date.prevText}).find("span").html(h.date.prevText)),u(n,n.maxS,n.minS),a.isVisible&&o.showPickerContent(i,a)}e("button.ws-empty",a.buttonRow).prop("disabled",e.prop(i.orig,"required")),a.isDirty=!1};a.actionFn=function(e){s[e["data-action"]]?s[e["data-action"]](e.value,a,i,0):t.warn("no action for "+e["data-action"])},a.contentElement.html('<button class="ws-prev" tabindex="0"><span></span></button> <button class="ws-next" tabindex="0"><span></span></button><div class="ws-picker-body"></div><div class="ws-button-row"><button type="button" class="ws-current" data-action="changeInput" value="'+c[i.type]+'" tabindex="0"></button> <button type="button" data-action="changeInput" value="" class="ws-empty" tabindex="0"></button></div>'),a.nextElement=e("button.ws-next",a.contentElement),a.prevElement=e("button.ws-prev",a.contentElement),a.bodyElement=e("div.ws-picker-body",a.contentElement),a.buttonRow=e("div.ws-button-row",a.contentElement),a.element.on("updatepickercontent",d),i.options.yearButtons&&(a.element.addClass("ws-year-buttons"),a.yearNextElement=e('<button class="ws-super-next" tabindex="0"><span></span></button>').insertAfter(a.nextElement),a.yearPrevElement=e('<button class="ws-super-prev" tabindex="0"><span></span></button>').insertBefore(a.prevElement)),a.contentElement.on("click","button[data-action]",r).on("change","select[data-action]",r),i.options.inlinePicker&&(i.options.updateOnInput=!0),e(i.options.orig).on("input",function(){var e;i.options.updateOnInput&&a.isVisible&&i.options.value&&(e=a.element.attr("data-currentview"))&&s[e](i.options.value,a,i,0)}),e(n).onTrigger("wslocalechange",i._propertyChange)}});