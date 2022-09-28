using System.Text.Json.Serialization;

namespace STSBuilder.Models
{
    public partial class RelicTag
    {
        public string RelicId { get; set; }
        public string RelicTagName { get; set; }

        [JsonIgnore]
        public virtual Relic Relic { get; set; }

        public virtual Tag TagNavigation { get; set; }
    }
}
