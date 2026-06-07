type LocaleText = {
  en?: string | null;
  cn?: string | null;
} | null;

type PortableTextSpan = {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children: PortableTextSpan[];
  markDefs: Array<Record<string, unknown>>;
  style: "normal";
};

type LocaleBlocks = {
  en?: PortableTextBlock[] | null;
  cn?: PortableTextBlock[] | null;
} | null;

type ShopImage = {
  asset?: {
    url?: string | null;
  } | null;
  alt?: LocaleText;
  crop?: unknown;
  hotspot?: unknown;
} | null;

type SanityShopVariant = {
  _key?: string;
  slug?: string | null;
  name?: LocaleText;
  price?: number | null;
  labelColor?: string | null;
  isDefault?: boolean | null;
  listingImage?: ShopImage;
  heroImage?: ShopImage;
} | null;

export type SanityShopProduct = {
  _id?: string;
  slug?: string | null;
  name?: LocaleText;
  customSVG?: string | null;
  orderIndex?: number | null;
  price?: number | null;
  listingImage?: ShopImage;
  heroImage?: ShopImage;
  description?: LocaleBlocks;
  variants?: SanityShopVariant[] | null;
} | null;

export type ShopVariant = {
  id: string;
  slug: string;
  name: LocaleText;
  price?: number | null;
  labelColor?: string | null;
  isDefault?: boolean;
  listingImage?: string;
  heroImage?: string;
};

export type ShopProduct = {
  id: string;
  slug: string;
  name: LocaleText;
  customSVG?: string | null;
  price: number;
  description: LocaleBlocks;
  listingImage?: string;
  heroImage?: string;
  variants: ShopVariant[];
};

export const SHOP_LANDING_POSITIONS = [
  "absolute right-[2vw] top-[6.75rem] w-[44vw] sm:w-[40vw] md:right-[9vw] md:top-[7.75rem] md:w-[26vw] lg:right-[10vw] lg:top-[5.5rem] lg:w-[20vw]",
  "absolute left-[4vw] top-[31svh] w-[42vw] sm:left-[6vw] sm:top-[34svh] sm:w-[32vw] md:left-[8vw] md:top-[36svh] md:w-[18vw] lg:left-[12vw] lg:top-[34svh] lg:w-[13vw]",
  "absolute bottom-[5.5rem] right-[3vw] w-[56vw] sm:w-[46vw] md:bottom-[7rem] md:right-[10vw] md:w-[24vw] lg:bottom-[5rem] lg:right-[11vw] lg:w-[18vw]",
] as const;

const FALLBACK_HERO_IMAGE =
  "https://cdn.prod.website-files.com/662b714fa61e6fb38978091f/6724a05d5cfdad867cba9093_cora.jpeg";

const PRODUCT_IMAGE_FALLBACKS: Record<
  string,
  {
    listing: string;
    hero?: string;
  }
> = {
  "set-socks": {
    listing: "/images/image.png",
    hero: "/images/image.png",
  },
  "nebula-chain": {
    listing: "/images/image2.png",
    hero: FALLBACK_HERO_IMAGE,
  },
  "chengdu-marathon-cap": {
    listing: "/images/tile-1-black.png",
  },
};

function paragraphBlock(key: string, text: string): PortableTextBlock {
  return {
    _key: key,
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [
      {
        _key: `${key}-span`,
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

const FALLBACK_PRODUCTS: ShopProduct[] = [
  {
    id: "set-socks",
    slug: "set-socks",
    name: {
      en: "Set Socks",
      cn: "SET 短袜",
    },
    price: 0,
    listingImage: "/images/image.png",
    heroImage: "/images/image.png",
    description: {
      en: [
        paragraphBlock(
          "set-socks-en-1",
          "Studio content has not been added for this product yet. Add copy, price, and imagery in Sanity to replace this fallback.",
        ),
      ],
      cn: [
        paragraphBlock(
          "set-socks-cn-1",
          "这个商品还没有在 Sanity 里添加正式内容。请在 Studio 里补充图片、文案和价格。",
        ),
      ],
    },
    variants: [],
  },
  {
    id: "nebula-chain",
    slug: "nebula-chain",
    name: {
      en: "Nebula Chain",
      cn: "星云锁链",
    },
    price: 0,
    listingImage: "/images/image2.png",
    heroImage: FALLBACK_HERO_IMAGE,
    description: {
      en: [
        paragraphBlock(
          "nebula-chain-en-1",
          ".TAG is 10! Celebrating a decade of dance, dedication, and evolution is nothing short of epic. In addition to our anniversary parties and 10-city world tour, we’re excited to honor these special moments with our .TAG family, friends, and supporters by launching this exclusive 10 Year Anniversary merch series.",
        ),
        paragraphBlock(
          "nebula-chain-en-2",
          "Designed with a distinct milky lustre to shimmer with you through endless nights. Available in four dazzling colours, jade green “Diabolo Dumbbell,” astro-blue “Iris,” ruby red “Flaming Star,” and pink-blue “Owl.”",
        ),
      ],
      cn: [
        paragraphBlock(
          "nebula-chain-cn-1",
          "作为 .TAG 十周年纪念系列的一部分，星云锁链为漫长夜晚带来柔和又闪烁的乳光质感。",
        ),
      ],
    },
    variants: [
      {
        id: "nebula-diabolo",
        slug: "diabolo",
        name: {
          en: "Diabolo",
          cn: "哑铃",
        },
        labelColor: "#05161F",
        isDefault: true,
      },
      {
        id: "nebula-iris",
        slug: "iris",
        name: {
          en: "Iris",
          cn: "鸢尾",
        },
        labelColor: "#C21A1A",
      },
      {
        id: "nebula-flaming-star",
        slug: "flaming-star",
        name: {
          en: "Flaming Star",
          cn: "焰火",
        },
        labelColor: "#E11717",
      },
      {
        id: "nebula-owl",
        slug: "owl",
        name: {
          en: "Owl",
          cn: "夜枭",
        },
        labelColor: "#D02274",
      },
    ],
  },
  {
    id: "chengdu-marathon-cap",
    slug: "chengdu-marathon-cap",
    name: {
      en: "Chengdu Marathon Cap",
      cn: "成都马拉松帽",
    },
    price: 0,
    listingImage: PRODUCT_IMAGE_FALLBACKS["chengdu-marathon-cap"].listing,
    description: {
      en: [
        paragraphBlock(
          "marathon-cap-en-1",
          "A washed black cap embroidered with the Chengdu Marathon 2020 mark. Replace the placeholder image with the final packshot once it is available.",
        ),
      ],
      cn: [
        paragraphBlock(
          "marathon-cap-cn-1",
          "水洗黑色帽款，绣有 Chengdu Marathon 2020 标记。等正式产品图准备好后可替换当前占位图。",
        ),
      ],
    },
    variants: [],
  },
];

function resolveImageUrl(image?: ShopImage, fallback?: string) {
  if (!image) {
    return fallback;
  }

  if (image.asset?.url) {
    return image.asset.url;
  }

  return fallback;
}

export function getLocalizedText(
  value: LocaleText | undefined,
  locale: string,
) {
  if (!value) {
    return "";
  }

  if (locale === "cn") {
    return value.cn || value.en || "";
  }

  return value.en || value.cn || "";
}

export function getVariantChineseLabel(value?: string | null) {
  return value?.replace(/\s*[（(][^）)]*[）)]\s*/g, "").trim() || "";
}

export function getLocalizedBlocks(
  value: LocaleBlocks | undefined,
  locale: string,
) {
  if (!value) {
    return [];
  }

  if (locale === "cn") {
    return value.cn || value.en || [];
  }

  return value.en || value.cn || [];
}

function mapVariant(
  variant: SanityShopVariant,
  productSlug: string,
): ShopVariant | null {
  if (!variant?.slug) {
    return null;
  }

  return {
    id: variant._key || `${productSlug}-${variant.slug}`,
    slug: variant.slug,
    name: variant.name || null,
    price: variant.price,
    labelColor: variant.labelColor,
    isDefault: Boolean(variant.isDefault),
    listingImage: resolveImageUrl(variant.listingImage),
    heroImage: resolveImageUrl(variant.heroImage),
  };
}

function mapProduct(product: SanityShopProduct): ShopProduct | null {
  if (!product?._id || !product.slug) {
    return null;
  }

  const slugFallback = PRODUCT_IMAGE_FALLBACKS[product.slug];

  const variants = (product.variants || [])
    .map((variant) => mapVariant(variant, product.slug || "product"))
    .filter((variant): variant is ShopVariant => Boolean(variant));

  const defaultVariant =
    variants.find((variant) => variant.isDefault) || variants[0] || null;

  return {
    id: product._id,
    slug: product.slug,
    name: product.name || null,
    customSVG: product.customSVG || null,
    price: product.price || 0,
    description: product.description || null,
    listingImage:
      resolveImageUrl(product.listingImage, slugFallback?.listing) || undefined,
    heroImage:
      defaultVariant?.heroImage ||
      resolveImageUrl(
        product.heroImage,
        resolveImageUrl(
          product.listingImage,
          slugFallback?.hero || slugFallback?.listing,
        ),
      ) ||
      undefined,
    variants,
  };
}

export function getShopProducts(products?: SanityShopProduct[] | null) {
  const mapped = (products || [])
    .map((product) => mapProduct(product))
    .filter((product): product is ShopProduct => Boolean(product));

  return mapped.length > 0 ? mapped : FALLBACK_PRODUCTS;
}

export function getShopProduct(
  product: SanityShopProduct | null | undefined,
  slug: string,
) {
  const mapped = product ? mapProduct(product) : null;

  if (mapped) {
    return mapped;
  }

  return FALLBACK_PRODUCTS.find((item) => item.slug === slug) || null;
}

export function getSelectedVariant(product: ShopProduct, variantSlug?: string) {
  if (!product.variants.length) {
    return null;
  }

  return (
    product.variants.find((variant) => variant.slug === variantSlug) ||
    product.variants.find((variant) => variant.isDefault) ||
    product.variants[0]
  );
}
