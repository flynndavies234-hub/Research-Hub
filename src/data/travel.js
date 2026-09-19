(function(root,factory){
 const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AITravel=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 function packingProgress(trip={}){
   const items=Array.isArray(trip.packing)?trip.packing:[];
   if(!items.length)return 0;
   return Math.round(items.filter(x=>x&&x.done).length/items.length*100);
 }
 function sortedItinerary(trip={}){
   return [...(Array.isArray(trip.itinerary)?trip.itinerary:[])].sort((a,b)=>String(a.date||'9999').localeCompare(String(b.date||'9999'))||String(a.text||'').localeCompare(String(b.text||'')));
 }
 function packingRemaining(trip={}){
   return (Array.isArray(trip.packing)?trip.packing:[]).filter(x=>x&&!x.done).length;
 }
 return {packingProgress,sortedItinerary,packingRemaining};
});
