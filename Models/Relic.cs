using System.Collections.Generic;

namespace STSBuilder.Models
{
    public partial class Relic
    {
        public Relic()
        {
            Descriptions = new HashSet<RelicDescription>();
            Tags = new HashSet<RelicTag>();
        }

        public string Id { get; set; }
        public string Image { get; set; }
        public string Sound { get; set; }
        public string Tier { get; set; }

        public virtual Sound SoundNavigation { get; set; }
        public virtual Tier TierNavigation { get; set; }

        
        public virtual ICollection<RelicDescription> Descriptions { get; set; }
        public virtual ICollection<RelicTag> Tags { get; set; }
    }
}
