using System.Text.Json.Serialization;

namespace STSBuilder.Models
{
    public partial class RelicDescription
    {
        public string RelicId { get; set; }
        public string DescriptionLanguage { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Flavor { get; set; }

        [JsonIgnore]
        public virtual Language DescriptionLanguageNavigation { get; set; }

        [JsonIgnore]
        public virtual Relic Relic { get; set; }
    }
}
