import { useTranslation } from 'react-i18next'
export default function NotFound(){
  const { t } = useTranslation()
  return (
    <main className="section">
      <div className="container">
        <h1 className="section-title">404</h1>
        <p className="section-sub">{t('common.notFound')}</p>
      </div>
    </main>
  )
}