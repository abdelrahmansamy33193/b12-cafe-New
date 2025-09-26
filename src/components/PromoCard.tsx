type Props = {
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
  secondary?: string;
}
export default function PromoCard({title, subtitle, image, cta, secondary}: Props){
  return (
    <div className="card" style={{overflow:'hidden'}}>
      <img src={image} alt="" style={{height:300, width:'100%', objectFit:'cover', borderRadius:16}} loading="lazy"/>
      <div style={{paddingTop:14}}>
        <div className="badge">{secondary || 'Seasonal'}</div>
        <h3 style={{margin:'10px 0 6px'}}>{title}</h3>
        <p style={{margin:'0 0 14px', color:'var(--muted)'}}>{subtitle}</p>
        <a className="btn ghost" href="#">{cta || 'Learn more'}</a>
      </div>
    </div>
  )
}