import { getCliClient } from 'sanity/cli';
const client = getCliClient({ apiVersion: '2025-05-01' });
function block(key, text) {
    return {
        _key: key,
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
            {
                _key: `${key}-span`,
                _type: 'span',
                marks: [],
                text,
            },
        ],
    };
}
const shopProducts = [
    {
        _id: 'shopProduct-set-socks',
        _type: 'shopProduct',
        name: {
            en: 'Set Socks',
            cn: 'SET 短袜',
        },
        slug: {
            _type: 'slug',
            current: 'set-socks',
        },
        orderIndex: 0,
        price: 0,
        description: {
            en: [
                block('set-socks-en-1', 'Classic .TAG socks with a clean white knit and embroidered SET mark. Price can be updated later once the final merch list is confirmed.'),
            ],
            cn: [
                block('set-socks-cn-1', '经典 .TAG 白色短袜，带有 SET 刺绣标记。价格可在最终商品清单确认后再更新。'),
            ],
        },
        variants: [],
    },
    {
        _id: 'shopProduct-nebula-chain',
        _type: 'shopProduct',
        name: {
            en: 'Nebula Chain',
            cn: '星云锁链',
        },
        slug: {
            _type: 'slug',
            current: 'nebula-chain',
        },
        orderIndex: 1,
        price: 0,
        description: {
            en: [
                block('nebula-chain-en-1', '.TAG is 10! Celebrating a decade of dance, dedication, and evolution is nothing short of epic. In addition to our anniversary parties and 10-city world tour, we’re excited to honor these special moments with our .TAG family, friends, and supporters by launching this exclusive 10 Year Anniversary merch series.'),
                block('nebula-chain-en-2', 'Designed with a distinct milky lustre to shimmer with you through endless nights. Available in four dazzling colours, jade green “Diabolo Dumbbell,” astro-blue “Iris,” ruby red “Flaming Star,” and pink-blue “Owl.”'),
            ],
            cn: [
                block('nebula-chain-cn-1', '作为 .TAG 十周年纪念系列的一部分，星云锁链为漫长夜晚带来柔和又闪烁的乳光质感。'),
            ],
        },
        variants: [
            {
                _key: 'diabolo',
                _type: 'variant',
                name: {
                    en: 'Diabolo',
                    cn: '哑铃',
                },
                slug: 'diabolo',
                labelColor: '#05161F',
                isDefault: true,
            },
            {
                _key: 'iris',
                _type: 'variant',
                name: {
                    en: 'Iris',
                    cn: '鸢尾',
                },
                slug: 'iris',
                labelColor: '#D41717',
                isDefault: false,
            },
            {
                _key: 'flaming-star',
                _type: 'variant',
                name: {
                    en: 'Flaming Star',
                    cn: '焰火',
                },
                slug: 'flaming-star',
                labelColor: '#D41717',
                isDefault: false,
            },
            {
                _key: 'owl',
                _type: 'variant',
                name: {
                    en: 'Owl',
                    cn: '夜枭',
                },
                slug: 'owl',
                labelColor: '#D41717',
                isDefault: false,
            },
        ],
    },
    {
        _id: 'shopProduct-chengdu-marathon-cap',
        _type: 'shopProduct',
        name: {
            en: 'Chengdu Marathon Cap',
            cn: '成都马拉松帽',
        },
        slug: {
            _type: 'slug',
            current: 'chengdu-marathon-cap',
        },
        orderIndex: 2,
        price: 0,
        description: {
            en: [
                block('marathon-cap-en-1', 'A washed black cap embroidered with the Chengdu Marathon 2020 mark. A placeholder image is used in the site until the final packshot is added.'),
            ],
            cn: [
                block('marathon-cap-cn-1', '水洗黑色帽款，绣有 Chengdu Marathon 2020 标记。当前站点使用占位图，正式产品图可之后替换。'),
            ],
        },
        variants: [],
    },
];
async function main() {
    for (const product of shopProducts) {
        await client.createOrReplace(product);
        console.log(`Seeded ${product._id}`);
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
