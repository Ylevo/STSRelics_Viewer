using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public class RelicIconService : IRelicIconService
    {
        readonly IWebHostEnvironment Environment;

        public RelicIconService(IWebHostEnvironment env)
        {
            Environment = env;
        }

        public IEnumerable<string> GetRelicIcons()
        { 
            var files = Directory.GetFiles(Environment.ContentRootPath + "/ClientApp/" + (Environment.EnvironmentName == "Development" ? "public" : "build") + "/img/relics_icons");
            string[] filenames = new string[files.Length];
            for (int i = 0; i < filenames.Length; i++)
            {
                filenames[i] = Path.GetFileName(files[i]);
            }
            return filenames;
        }

        public async Task<IActionResult> UploadNewRelicIcon(IconFile iconFile)
        {
            try
            {
                if (iconFile.Formfile == null)
                {
                    return new StatusCodeResult(StatusCodes.Status400BadRequest);
                }
                List<string> acceptedExtensions = new List<string> {".jpg", ".jpeg", ".png"};
                string path = Environment.ContentRootPath + "/ClientApp/" + (Environment.EnvironmentName == "Development" ? "public" : "build") + "/img/relics_icons/" + iconFile.Formfile.FileName;
                string fileExtension = Path.GetExtension(path);
                if (!acceptedExtensions.Contains(fileExtension))
                {
                    return new StatusCodeResult(StatusCodes.Status401Unauthorized);
                }
                if (File.Exists(path))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                if (iconFile.Formfile.Length > 500000)
                {
                    return new StatusCodeResult(StatusCodes.Status413PayloadTooLarge);
                }
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    
                    await iconFile.Formfile.CopyToAsync(stream);
                }
                return new StatusCodeResult(StatusCodes.Status200OK);
            }
            catch (Exception)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
