export function validate(s){
 if(!s||s.version!==1||typeof s.name!=='string'||!s.name.trim())throw Error('Name and version 1 required.');
 if(!Number.isInteger(s.horizon)||s.horizon<1||s.horizon>10000)throw Error('Horizon must be 1–10000 whole hours.');
 if(!Array.isArray(s.scenarios)||s.scenarios.length<1||s.scenarios.length>30)throw Error('Use 1–30 scenarios.');
 if(typeof s.review!=='string')throw Error('Review must be text.');
 const ids=new Set();
 for(const r of s.scenarios){
  if(typeof r.name!=='string'||!r.name.trim()||ids.has(r.name))throw Error('Unique scenario names required.');ids.add(r.name);
  if(!['EW','DE','Cyber'].includes(r.domain))throw Error('Domain must be EW, DE or Cyber.');
  for(const k of ['start','duration','recovery'])if(!Number.isInteger(r[k])||r[k]<0||r[k]>10000)throw Error(k+' must be 0–10000 whole hours.');
  for(const k of ['lossLow','lossHigh','threshold'])if(typeof r[k]!=='number'||!Number.isFinite(r[k])||r[k]<0||r[k]>1)throw Error(k+' must be between 0 and 1.');
  if(r.lossLow>r.lossHigh)throw Error('Loss interval is reversed.');
  if(typeof r.source!=='string'||!['synthetic','declared','measured'].includes(r.basis))throw Error('Source text and valid evidence basis required.');
 }
 return s;
}
function curve(s,r,loss){
 let lossHours=0,below=0,min=1;
 const points=[];
 for(let t=0;t<s.horizon;t++){
  let remaining=0;
  if(r.duration>0&&t>=r.start&&t<r.start+r.duration)remaining=loss;
  else if(r.duration>0&&r.recovery>0&&t>=r.start+r.duration&&t<r.start+r.duration+r.recovery)remaining=loss*(1-(t-r.start-r.duration)/r.recovery);
  const service=1-remaining;lossHours+=remaining;min=Math.min(min,service);if(service<r.threshold)below++;
  points.push({hour:t,service});
 }
 return {lossHours,averageService:1-lossHours/s.horizon,minimumService:min,hoursBelowThreshold:below,points};
}
export function evaluate(s){
 validate(s);
 return s.scenarios.map(r=>({name:r.name,domain:r.domain,basis:r.basis,source:r.source,flags:[...(r.basis==='synthetic'?['Synthetic inputs']:[]),...(!r.source.trim()?['Missing source reference']:[]),...(!s.review.trim()?['Review pending']:[])],optimistic:curve(s,r,r.lossLow),pessimistic:curve(s,r,r.lossHigh)}));
}
export function csv(rows){
 const cols=['name','domain','basis','averageServiceLow','averageServiceHigh','lossHoursLow','lossHoursHigh','belowThresholdLow','belowThresholdHigh'];
 const quote=v=>'"'+String(v??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"';
 const data=rows.map(r=>[r.name,r.domain,r.basis,r.pessimistic.averageService,r.optimistic.averageService,r.optimistic.lossHours,r.pessimistic.lossHours,r.optimistic.hoursBelowThreshold,r.pessimistic.hoursBelowThreshold]);
 return [cols,...data].map(r=>r.map(quote).join(',')).join('\r\n');
}
