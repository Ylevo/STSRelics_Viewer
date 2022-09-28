using System.Collections.Generic;

namespace STSBuilder.Models
{
    public partial class Language
    {
        public Language()
        {
            RelicsDescriptions = new HashSet<RelicDescription>();
        }
        public string LanguageId { get; set; }
        public string LanguageName { get; set; }

        public virtual ICollection<RelicDescription> RelicsDescriptions { get; set; }
    }
}
