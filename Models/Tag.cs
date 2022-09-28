using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace STSBuilder.Models
{
    public partial class Tag
    {
        public Tag()
        {
            RelicsTags = new HashSet<RelicTag>();
        }

        public string TagName { get; set; }
        public string Type { get; set; }

        [JsonIgnore]
        public virtual ICollection<RelicTag> RelicsTags { get; set; }
    }
}
