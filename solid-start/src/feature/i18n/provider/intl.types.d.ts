
type NumberFormatOptions = {
    minimumIntegerDigits?: OneThroughTwentyOne;
    minimumFractionDigits?: ZeroThroughTwenty;
    maximumFractionDigits?: ZeroThroughTwenty;
    roundingMode?:
        | 'ceil'
        | 'floor'
        | 'expand'
        | 'trunc'
        | 'halfCeil'
        | 'halfFloor'
        | 'halfExpand'
        | 'halfTrunc'
        | 'halfEven';
    trailingZeroDisplay?: 'auto' | 'stripIfInteger';
    useGrouping?: 'always'|'auto'|'min2'|true|false;
    signDisplay?: 'auto'|'always'|'exceptZero'|'negative'|'never';
} & Notation &
    Rounding &
    Style;

type Notation = Either<{ notation?: 'standard' | 'scientific' | 'engineering' }, CompactDisplay>;
type Rounding = Either<AutoRoundingWithIncrement, AutoRounding>;
type Style = DecimalStyle | CurrencyStyle | PercentStyle | UnitStyle | {};

type CompactDisplay = {
    notation: 'compact';
    compactDisplay?: 'short' | 'long';
};

type AutoRoundingWithIncrement = {
    roundingPriority?: 'auto';
    roundingIncrement: RoundingIncrement;
};

type AutoRounding = {
    roundingPriority?: 'auto' | 'morePrecision' | 'lessPrecision';
    minimumSignificantDigits?: OneThroughTwentyOne;
    maximumSignificantDigits?: OneThroughTwentyOne;
};

type DecimalStyle = {
    style: 'decimal';
};

type CurrencyStyle = {
    readonly style: 'currency';
    currency: Currency;
    currencyDisplay?: 'code' | 'symbol' | 'narrowSymbol' | 'name';
    currencySign?: 'standard' | 'accounting';
};

type PercentStyle = {
    readonly style: 'percent';
};

type UnitStyle = {
    readonly style: 'unit';
    unit: Unit; // | `${Unit}-per-${Unit}`; list is already exaustive it seems
    unitDisplay?: 'short' | 'narrow' | 'long';
};

// prettier-ignore
type RoundingIncrement = 1 | 2 | 5 | 10 | 20 | 25 | 50 | 100 | 200 | 250 | 1000 | 2000 | 2500 | 5000;
// prettier-ignore
type ZeroThroughTwenty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
// prettier-ignore
type OneThroughTwentyOne = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

// https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
// prettier-ignore
type Currency = 'AED'|'AFN'|'ALL'|'AMD'|'ANG'|'AOA'|'ARS'|'AUD'|'AWG'|'AZN'|'BAM'|'BBD'|'BDT'|'BGN'|'BHD'|'BIF'|'BMD'|'BND'|'BOB'|'BOV'|'BRL'|'BSD'|'BTN'|'BWP'|'BYN'|'BZD'|'CAD'|'CDF'|'CHE'|'CHF'|'CHW'|'CLF'|'CLP'|'CNY'|'COP'|'COU'|'CRC'|'CUP'|'CVE'|'CZK'|'DJF'|'DKK'|'DOP'|'DZD'|'EGP'|'ERN'|'ETB'|'EUR'|'FJD'|'FKP'|'GBP'|'GEL'|'GHS'|'GIP'|'GMD'|'GNF'|'GTQ'|'GYD'|'HKD'|'HNL'|'HTG'|'HUF'|'IDR'|'ILS'|'INR'|'IQD'|'IRR'|'ISK'|'JMD'|'JOD'|'JPY'|'KES'|'KGS'|'KHR'|'KMF'|'KPW'|'KRW'|'KWD'|'KYD'|'KZT'|'LAK'|'LBP'|'LKR'|'LRD'|'LSL'|'LYD'|'MAD'|'MDL'|'MGA'|'MKD'|'MMK'|'MNT'|'MOP'|'MRU'|'MUR'|'MVR'|'MWK'|'MXN'|'MXV'|'MYR'|'MZN'|'NAD'|'NGN'|'NIO'|'NOK'|'NPR'|'NZD'|'OMR'|'PAB'|'PEN'|'PGK'|'PHP'|'PKR'|'PLN'|'PYG'|'QAR'|'RON'|'RSD'|'RUB'|'RWF'|'SAR'|'SBD'|'SCR'|'SDG'|'SEK'|'SGD'|'SHP'|'SLE'|'SLL'|'SOS'|'SRD'|'SSP'|'STN'|'SVC'|'SYP'|'SZL'|'THB'|'TJS'|'TMT'|'TND'|'TOP'|'TRY'|'TTD'|'TWD'|'TZS'|'UAH'|'UGX'|'USD'|'USN'|'UYI'|'UYU'|'UYW'|'UZS'|'VED'|'VES'|'VND'|'VUV'|'WST'|'XAF'|'XAG'|'XAU'|'XBA'|'XBB'|'XBC'|'XBD'|'XCD'|'XDR'|'XOF'|'XPD'|'XPF'|'XPT'|'XSU'|'XTS'|'XUA'|'XXX'|'YER'|'ZAR'|'ZMW'|'ZWL';

// https://github.com/unicode-org/cldr/blob/main/common/validity/unit.xml
// prettier-ignore
type Unit = 'acceleration-g-force'|'acceleration-meter-per-square-second'|'angle-revolution'|'angle-radian'|'angle-degree'|'angle-arc-minute'|'angle-arc-second'|'area-square-kilometer'|'area-hectare'|'area-square-meter'|'area-square-centimeter'|'area-square-mile'|'area-acre'|'area-square-yard'|'area-square-foot'|'area-square-inch'|'area-dunam'|'concentr-karat'|'concentr-milligram-ofglucose-per-deciliter'|'concentr-millimole-per-liter'|'concentr-item'|'concentr-permillion'|'concentr-percent'|'concentr-permille'|'concentr-permyriad'|'concentr-mole'|'consumption-liter-per-kilometer'|'consumption-liter-per-100-kilometer'|'consumption-mile-per-gallon'|'consumption-mile-per-gallon-imperial'|'digital-petabyte'|'digital-terabyte'|'digital-terabit'|'digital-gigabyte'|'digital-gigabit'|'digital-megabyte'|'digital-megabit'|'digital-kilobyte'|'digital-kilobit'|'digital-byte'|'digital-bit'|'duration-century'|'duration-decade'|'duration-year'|'duration-year-person'|'duration-quarter'|'duration-month'|'duration-month-person'|'duration-week'|'duration-week-person'|'duration-day'|'duration-day-person'|'duration-hour'|'duration-minute'|'duration-second'|'duration-millisecond'|'duration-microsecond'|'duration-nanosecond'|'electric-ampere'|'electric-milliampere'|'electric-ohm'|'electric-volt'|'energy-kilocalorie'|'energy-calorie'|'energy-foodcalorie'|'energy-kilojoule'|'energy-joule'|'energy-kilowatt-hour'|'energy-electronvolt'|'energy-british-thermal-unit'|'energy-therm-us'|'force-pound-force'|'force-newton'|'force-kilowatt-hour-per-100-kilometer'|'frequency-gigahertz'|'frequency-megahertz'|'frequency-kilohertz'|'frequency-hertz'|'graphics-em'|'graphics-pixel'|'graphics-megapixel'|'graphics-pixel-per-centimeter'|'graphics-pixel-per-inch'|'graphics-dot-per-centimeter'|'graphics-dot-per-inch'|'graphics-dot'|'length-earth-radius'|'length-kilometer'|'length-meter'|'length-decimeter'|'length-centimeter'|'length-millimeter'|'length-micrometer'|'length-nanometer'|'length-picometer'|'length-mile'|'length-yard'|'length-foot'|'length-inch'|'length-parsec'|'length-light-year'|'length-astronomical-unit'|'length-furlong'|'length-fathom'|'length-nautical-mile'|'length-mile-scandinavian'|'length-point'|'length-solar-radius'|'light-lux'|'light-candela'|'light-lumen'|'light-solar-luminosity'|'mass-tonne'|'mass-kilogram'|'mass-gram'|'mass-milligram'|'mass-microgram'|'mass-ton'|'mass-stone'|'mass-pound'|'mass-ounce'|'mass-ounce-troy'|'mass-carat'|'mass-dalton'|'mass-earth-mass'|'mass-solar-mass'|'mass-grain'|'power-gigawatt'|'power-megawatt'|'power-kilowatt'|'power-watt'|'power-milliwatt'|'power-horsepower'|'pressure-millimeter-ofhg'|'pressure-pound-force-per-square-inch'|'pressure-inch-ofhg'|'pressure-bar'|'pressure-millibar'|'pressure-atmosphere'|'pressure-pascal'|'pressure-hectopascal'|'pressure-kilopascal'|'pressure-megapascal'|'speed-kilometer-per-hour'|'speed-meter-per-second'|'speed-mile-per-hour'|'speed-knot'|'temperature-generic'|'temperature-celsius'|'temperature-fahrenheit'|'temperature-kelvin'|'torque-pound-force-foot'|'torque-newton-meter'|'volume-cubic-kilometer'|'volume-cubic-meter'|'volume-cubic-centimeter'|'volume-cubic-mile'|'volume-cubic-yard'|'volume-cubic-foot'|'volume-cubic-inch'|'volume-megaliter'|'volume-hectoliter'|'volume-liter'|'volume-deciliter'|'volume-centiliter'|'volume-milliliter'|'volume-pint-metric'|'volume-cup-metric'|'volume-acre-foot'|'volume-bushel'|'volume-gallon'|'volume-gallon-imperial'|'volume-quart'|'volume-pint'|'volume-cup'|'volume-fluid-ounce'|'volume-fluid-ounce-imperial'|'volume-tablespoon'|'volume-teaspoon'|'volume-barrel'|'volume-dessert-spoon'|'volume-dessert-spoon-imperial'|'volume-drop'|'volume-dram'|'volume-jigger'|'volume-pinch'|'volume-quart-imperial'|'angle-steradian'|'concentr-portion'|'concentr-ofglucose'|'concentr-katal'|'duration-fortnight'|'electric-coulomb'|'electric-farad'|'electric-henry'|'electric-siemens'|'energy-calorie-it'|'energy-british-thermal-unit-it'|'energy-becquerel'|'energy-sievert'|'energy-gray'|'force-kilogram-force'|'length-100-kilometer'|'length-rod'|'length-chain'|'magnetic-tesla'|'magnetic-weber'|'mass-slug'|'pressure-ofhg'|'speed-beaufort'|'temperature-rankine'|'volume-pint-imperial'|'pressure-gasoline-energy-density'|'length-rin'|'length-sun'|'length-shaku-length'|'length-shaku-cloth'|'length-ken'|'length-jo-jp'|'length-ri-jp'|'area-bu-jp'|'area-se-jp'|'area-cho'|'volume-kosaji'|'volume-osaji'|'volume-cup-jp'|'volume-shaku'|'volume-sai'|'volume-to-jp'|'volume-koku'|'mass-fun'
