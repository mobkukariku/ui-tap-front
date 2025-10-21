export function AccommodationHeader() {
    return (
        <section>
            <div
                className={"w-full h-70 relative rounded-lg bg-cover bg-center"}
                style={{ backgroundImage: 'url(https://picsum.photos/200/300)' }}
            >
            </div>
            <div className={"p-6 flex flex-col gap-4"}>
                <h3 className={"text-2xl font-semibold "}>Гранд Будапешт</h3>
                <p className={"text-sm text-gray-600"}>Grand Plaza South — это не просто отель, это флагман гостеприимства Южного Казахстана, где традиционная роскошь встречается с искусством индивидуального сервиса. Мы известны своим культом внимания к деталям и эксцентричным, но всегда безупречным подходом к обслуживанию. Каждый гость для нас — отдельная история.</p>
            </div>
        </section>
    )
}