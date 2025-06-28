<div className="flex flex-wrap gap-1">
  {(listing.amenities ?? []).map((am: string) => (
    <span key={am} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">{am}</span>
  ))}
  {listing.touristArea && (
    <span className="px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full text-xs">
      {listing.touristArea}
    </span>
  )}
</div>