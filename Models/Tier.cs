using System.Collections.Generic;

namespace STSBuilder.Models
{
    public partial class Tier
    {
        public Tier()
        {
            Relics = new HashSet<Relic>();
        }

        public string TierName { get; set; }

        public virtual ICollection<Relic> Relics { get; set; }
    }
}
