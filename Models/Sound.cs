using System.Collections.Generic;

namespace STSBuilder.Models
{
    public partial class Sound
    {
        public Sound()
        {
            Relics = new HashSet<Relic>();
        }

        public string SoundName { get; set; }

        public virtual ICollection<Relic> Relics { get; set; }
    }
}
