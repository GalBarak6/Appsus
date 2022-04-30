export function ColorInput({ handleStyleChange }) {
    console.log('ColorInput')
    const colors = ['#42C2FF', '#85F4FF', '#B8FFF9','#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1','#FF6FB5', '#AB46D2']

    return <section className="items-container">
            {colors.map(color => <div className="item" key={color}
                style={{ backgroundColor: color }}
                onClick={() => {console.log('backgroundColor', color)
                    return handleStyleChange('backgroundColor', color)}}>
            </div>)}
    </section>
}