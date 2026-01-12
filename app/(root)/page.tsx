import TradingViewWidget from '@/components/TradingViewWidget';
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from '@/lib/constants';

const MAIN_URL = 'https://s3.tradingview.com/external-embedding/embed-widget';

const MARKET_OVERVIEW_URL = `${MAIN_URL}-market-overview.js`;

const STOCK_HEATMAP_URL = `${MAIN_URL}-stock-heatmap.js`;

const TIMELINE_URL = `${MAIN_URL}-timeline.js`;

const MARKET_QUOTES_URL = `${MAIN_URL}-market-quotes.js`;

const Home = () => {
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market overview"
            scriptUrl={MARKET_OVERVIEW_URL}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>

        <div className="md-col-span xl:col-span-2">
          <TradingViewWidget
            title="Stock heatmap"
            scriptUrl={STOCK_HEATMAP_URL}
            config={HEATMAP_WIDGET_CONFIG}
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            scriptUrl={TIMELINE_URL}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>

        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            title="Stock heatmap"
            scriptUrl={MARKET_QUOTES_URL}
            config={MARKET_DATA_WIDGET_CONFIG}
          />
        </div>
      </section>
    </div>
  );
};
export default Home;
