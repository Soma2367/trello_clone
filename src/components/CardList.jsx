export default function CardList({ cards }) {
    if (cards.length === 0) return <p>カードがまだありません。</p>;
  
    return (
      <div className="space-y-3">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{card.title}</h3>
            <p>{card.content}</p>
            <p className="text-gray-500 text-sm">期限: {card.date}</p>
          </div>
        ))}
      </div>
    );
  }
  