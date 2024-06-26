import Header from '@components/common/header';
import { Page, PageContent } from '@components/common/layout';
import illustration from '@assets/illustrations/page_not_found.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from '@components/common/footer';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Header />
      <PageContent className="items-center py-24">
        <img src={illustration} className="w-64 mb-8" alt=""></img>
        <p className="mt-4 text-xl font-semibold">{t('page.not-found.title')}</p>
        <p className="mt-2">
          {t('page.not-found.description')}
          <Link to="/" className="underline hover:text-primary transition-colors">
          {t('page.not-found.homepage')}
          </Link>
        </p>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default NotFoundPage;
