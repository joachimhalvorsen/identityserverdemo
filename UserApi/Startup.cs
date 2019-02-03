using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace UserApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddMvcCore()
                .AddAuthorization(options =>
                {
                    options.AddPolicy("write_access", ScopePolicy.Create("userapi.write_access"));
                })
                .AddJsonFormatters();

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = "http://localhost:5000";
                    options.ApiName = "userapi";
                    options.RequireHttpsMetadata = false;
                });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(policy =>
            {
                policy.AllowAnyOrigin();
                policy.AllowAnyMethod();
                policy.AllowAnyHeader();
                policy.AllowCredentials();
            });
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}