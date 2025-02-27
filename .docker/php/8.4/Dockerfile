# Use the official PHP image with Apache, version 8.4
FROM php:8.4-apache

# Set the Apache document root to the public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Update package lists and install necessary packages
RUN apt-get update && apt-get install -y \
    libfreetype-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    git 

# Clean up the package lists to reduce image size
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Configure and install PHP extensions with Docker
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd zip pdo pdo_mysql

# Install and enable PHP extensions with PECL
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Node.js from NodeSource
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs

# Enable Apache modules
RUN a2enmod rewrite headers

# Update Apache configuration to use the new document root
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy custom Apache configuration file
COPY .docker/php/8.4/apache.conf  /etc/apache2/sites-available/000-default.conf

# Copy custom PHP configuration file
COPY .docker/php/8.4/php.ini /usr/local/etc/php/php.ini

# Copy custom Xdebug configuration file
COPY .docker/php/8.4/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Set the working directory
WORKDIR /var/www/html

# Copy the application code and set the appropriate permissions
COPY --chown=www-data:www-data ../../ /var/www/html
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80 for the web server
EXPOSE 80

# Start Apache in the foreground
ENTRYPOINT apache2-foreground